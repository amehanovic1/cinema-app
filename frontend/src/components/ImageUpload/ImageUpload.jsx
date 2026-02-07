import { useState } from "react";
import { supabase } from "../../supabaseClient";

const ImageUpload = ({ onUploadSuccess }) => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const uploadImage = async () => {
        const fileName = `${Date.now()}-${image.name}`;

        try {
            const { data: imageData, error: uploadError } = await supabase.storage
                .from("cinebh")
                .upload(fileName, image);

            if (uploadError) {
                console.log(uploadError);
            }
            if (imageData) {
                console.log(imageData);
                const { data: publicUrlData } = supabase.storage
                    .from("cinebh")
                    .getPublicUrl(fileName);

                const publicUrl = publicUrlData.publicUrl;
                setImageUrl(publicUrl);

                if (onUploadSuccess) {
                    onUploadSuccess(publicUrl);
                }

                return publicUrl;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="file" onChange={handleImageChange} accept="image/*" className="w-full" />

            <button onClick={uploadImage} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>

            <div className="relative w-full aspect-square bg-neutral-100 rounded-2xl overflow-hidden border">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="uploaded"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute bottom-0 left-0 w-full px-3 py-2 bg-black/30">
                        <span className="text-sm text-neutral-0">Upload Photo</span>
                    </div>
                )}
            </div>
        </div>

    );
}

export default ImageUpload;