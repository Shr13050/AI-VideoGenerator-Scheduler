import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const supabaseAdmin = getSupabaseAdmin();

        if (id) {
            const { data, error } = await supabaseAdmin
                .from("video_series")
                .select("*")
                .eq("user_id", userId)
                .eq("id", id)
                .single();

            if (error) {
                console.error("Supabase Error:", error);
                return new NextResponse(error.message, { status: 500 });
            }

            return NextResponse.json(data);
        } else {
            const { data, error } = await supabaseAdmin
                .from("video_series")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Supabase Error:", error);
                return new NextResponse(error.message, { status: 500 });
            }

            return NextResponse.json(data);
        }
    } catch (error) {
        console.error("[GET_SERIES_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
