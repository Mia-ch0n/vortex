export interface SystemRequirements {
    id: number;
    min_os: string;
    rec_os: string;
    game_id: number;
    min_cpu: string;
    rec_cpu: string;
    created_at: string;
    min_ram_gb: number;
    rec_ram_gb: number;
    updated_at: string;
    min_video_card: string;
    rec_video_card: string;
    min_shader_model: string;
    rec_shader_model: string;
    min_dedicated_vram_mb: number;
    rec_dedicated_vram_mb: number;
    min_free_disk_space_gb: number;
    rec_free_disk_space_gb: number;
}

export interface Game {
    id: number;
    name: string;
    publisher: string;
    min_age: number;
    release_date: string;
    duration_minutes: number | null;
    description: string;
    genres: string[];
    image_url: string;
    created_at: string;
    link: string;
    featured: number;
    additional_image1: string;
    additional_image2: string;
    additional_image3: string;
    system_requirements: SystemRequirements[];
    reviews: any[]; // We can define a Review interface later if needed
}