import { Metadata } from "next";

interface PageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return {
        title: `Petition ${params.id}`,
    };
}
