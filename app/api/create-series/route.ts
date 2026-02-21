import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const supabaseAdmin = getSupabaseAdmin();
        const body = await req.json();
        const {
            id,
            seriesName,
            niche,
            nicheType,
            language,
            voice,
            music,
            videoStyle,
            captionStyle,
            duration,
            platforms,
            publishDate,
        } = body;

        // Validate required fields
        if (!seriesName || !niche || !language || !voice || !videoStyle || !duration || !publishDate) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const seriesData = {
            user_id: userId,
            series_name: seriesName,
            niche: niche,
            niche_type: nicheType,
            language: language,
            voice: voice,
            music: music,
            video_style: videoStyle,
            caption_style: captionStyle,
            duration: duration,
            platforms: platforms,
            publish_date: publishDate,
            status: "scheduled",
        };

        let result;
        if (id) {
            // Update existing
            result = await supabaseAdmin
                .from("video_series")
                .update(seriesData)
                .eq("id", id)
                .eq("user_id", userId)
                .select()
                .single();
        } else {
            // Create new
            result = await supabaseAdmin
                .from("video_series")
                .insert(seriesData)
                .select()
                .single();
        }

        const { data, error } = result;

        if (error) {
            console.error("Supabase Error:", error);
            return new NextResponse(error.message, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("[CREATE_SERIES_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
