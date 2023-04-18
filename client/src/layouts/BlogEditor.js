import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

function BlogEditor() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const [coverPhoto, setCoverPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    const handleAddPhoto = () => {
        // implement logic for adding a photo to the content
    };

    const handleAddVideo = () => {
        // implement logic for adding a video to the content
    };

    const handleAddCodeBlock = () => {
        // implement logic for adding a code block to the content
    };

    const handlePublish = () => {
        // implement logic for publishing the blog
    };

    return (
        <div>
            <h2>Write a Blog</h2>
            <div>
                <label htmlFor="image-upload">
                    <input type="file" id="image-upload" onChange={handleImageChange}/>
                    {selectedImage ? (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            width="300"
                            height="200"
                        />
                    ) : (
                        <FontAwesomeIcon icon={faImage} size="4x"/>
                    )}
                </label>
            </div>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="summary">Summary</label>
                <textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <div id="content" contentEditable="true" dangerouslySetInnerHTML={{__html: content}}/>
                <div>
                    <button onClick={handleAddPhoto}>Add Photo</button>
                    <button onClick={handleAddVideo}>Add Video</button>
                    <button onClick={handleAddCodeBlock}>Add Code Block</button>
                </div>
            </div>
            <div>
                <button onClick={handlePublish}>Publish</button>
            </div>
        </div>
    );
}

export default BlogEditor