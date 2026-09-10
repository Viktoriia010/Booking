export type HotelType = {
    id: string,
    name:string,
    city: string,
    country: string,
    rating: number,
    location: string,
    price:number,
    is_liked: boolean,
    // images: FileList
    images: string[];
}