import { getSupabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        // Get Clerk webhook secret
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

        if (!WEBHOOK_SECRET) {
            console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Get the headers
        const headerPayload = await headers();
        const svix_id = headerPayload.get("svix-id");
        const svix_timestamp = headerPayload.get("svix-timestamp");
        const svix_signature = headerPayload.get("svix-signature");

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            console.error("Missing svix headers");
            return NextResponse.json(
                { error: "Missing svix headers" },
                { status: 400 }
            );
        }

        // Get the body
        const payload = await req.json();
        const body = JSON.stringify(payload);

        // Create a new Svix instance with your webhook secret
        const wh = new Webhook(WEBHOOK_SECRET);

        let evt: any;

        // Verify the webhook signature
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
        } catch (err: any) {
            console.error("Error verifying webhook:", err.message);
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 400 }
            );
        }

        // Handle the webhook
        const { type, data } = evt;

        if (type === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = data;
            const email = email_addresses[0]?.email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";

            const supabaseAdmin = getSupabaseAdmin();

            const { error } = await supabaseAdmin
                .from("user")
                .insert([
                    {
                        id: id,
                        email: email,
                        name: name,
                        image_url: image_url || null,
                        credits: 100, // Default credits for new users
                    },
                ]);

            if (error) {
                console.error("Error inserting user into Supabase:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            console.log("✅ User created in Supabase:", id);
            return NextResponse.json({ message: "User created in Supabase" }, { status: 200 });
        }

        return NextResponse.json({ message: "Webhook received" }, { status: 200 });
    } catch (error: any) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
