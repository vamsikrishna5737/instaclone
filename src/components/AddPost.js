import React, { useState } from "react";
import Navbar from "../LandingPage/Navbar";

const AddPost = () => {
  const [isSucess, setIsSucess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const PostImage = e.target.elements.PostImage.value;
      const name = e.target.elements.name.value;
      const description = e.target.elements.description.value;
      const location = e.target.elements.location.value;
      const date = String(new Date());
      const imgArr = PostImage.split(".");
      const imgExt = imgArr[imgArr.length - 1];

      const allowedExtensionts = ["jpg", "jpeg", "png", ".gif"];
      if (allowedExtensionts.includes(imgExt.toLowerCase())) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("description", description);
        const file = e.target.elements.PostImage.files[0];
        formData.append("PostImage", file);
        formData.append("date", date);

        const response = await fetch(process.env.REACT_APP_API + "/post/add", {
          method: "POST",
          headers: {},
          body: formData,
        });

        setIsUploading(false);

        const resp = await response.json();

        setIsSucess(true);
        setTimeout(() => {
          setIsSucess(false);
        }, 3000);

        e.target.reset();

        console.log(resp);
      } else {
        setIsUploading(false);
        setIsFailed(true);
        setTimeout(() => {
          setIsFailed(false);
        }, 3000);
        alert("Only => jpg, jpeg, png, gif");
      }
    } catch (e) {
      setIsUploading(false);
      setIsFailed(true);
      setTimeout(() => {
        setIsFailed(false);
      }, 3000);
    }
  };
  return (
    <>
      <Navbar />

      <div className="add-post-container">
        <form
          action="http://localhost:3004/api/post/add"
          method="post"
          className="post-form"
          onSubmit={handleSubmit}
        >
          {isSucess ? (
            <div
              style={{
                position: "absolute",
                color: "green",
                fontSize: "1.7rem",
              }}
            >
              Post Added
            </div>
          ) : (
            ""
          )}

          {isUploading ? (
            <div
              style={{
                position: "absolute",
                color: "skyblue",
                fontSize: "1.7rem",
              }}
            >
              Uploading...
            </div>
          ) : (
            ""
          )}

          {isFailed ? (
            <div
              style={{
                position: "absolute",
                color: "red",
                fontSize: "1.7rem",
              }}
            >
              Upload Failed
            </div>
          ) : (
            ""
          )}

          <div className="upload">
            <input type="file" name="upload" id="PostImage" required />
          </div>

          <div className="Author-location">
            <input type="text" id="name" placeholder="Author" required />
            <input type="text" id="location" placeholder="location" required />
          </div>

          <div className="description">
            <input
              type="text"
              id="description"
              placeholder="description"
              className="description"
              required
            />
          </div>

          <div>
            <button type="submit" className="post-submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPost;
