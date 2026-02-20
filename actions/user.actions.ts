'use server'

import { auth, currentUser } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function syncUser() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            console.log("⚠️ No user found for sync");
            return { error: "User not found" };
        }

        const supabaseAdmin = getSupabaseAdmin();

        // Check if user exists
        const { data: existingUser, error: selectError } = await supabaseAdmin
            .from("user")
            .select("*")
            .eq("id", userId)
            .single();

        // If there's an error other than "not found", log it
        if (selectError && selectError.code !== 'PGRST116') {
            console.error("❌ Error checking user:", {
                code: selectError.code,
                message: selectError.message,
                details: selectError.details,
                hint: selectError.hint
            });
        }

        // If user doesn't exist, create them
        if (!existingUser) {
            console.log("📝 Creating new user in Supabase:", userId);

            const { data: newUser, error: insertError } = await supabaseAdmin
                .from("user")
                .insert({
                    id: userId,
                    email: user.emailAddresses[0].emailAddress,
                    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
                    image_url: user.imageUrl || null,
                    credits: 100,
                })
                .select()
                .single();

            if (insertError) {
                console.error("❌ Error creating user:", {
                    code: insertError.code,
                    message: insertError.message,
                    details: insertError.details,
                    hint: insertError.hint
                });
                return {
                    error: insertError.message || "Failed to create user",
                    details: insertError
                };
            }

            console.log("✅ User created in Supabase:", userId);
            return { success: true, data: newUser };
        } else {
            console.log("✓ User already exists:", userId);
            return { success: true, data: existingUser };
        }

    } catch (error: any) {
        console.error("❌ Sync error:", error);
        return {
            error: error?.message || "Unknown error",
            details: error
        };
    }
}

export async function getUserData() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "Not authenticated" };
        }

        const supabaseAdmin = getSupabaseAdmin();

        const { data: user, error } = await supabaseAdmin
            .from("user")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching user:", error);
            return { error: error.message };
        }

        return { success: true, data: user };
    } catch (error: any) {
        console.error("Error:", error);
        return { error: error.message };
    }
}
