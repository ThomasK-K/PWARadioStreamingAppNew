export interface RadioStation {
    id: string;
    name: string;
    imageUrl?: string; // Optional Bild-URL für die Station
}

export interface RadioStream {
    name: string;
    url: string;
}
