import "./EditArticleModal.css";

// Hooks
import { useState, useRef, useEffect } from "react";

// Store
import { useArticleStore } from "../../store/useArticleStore";

const EditArticleModal = () => {
  const { selectedArticle, updateArticle } = useArticleStore();

  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    articleTag: [],
    isPublished: false,
  });

  const articleTagInput = useRef();
  const articleCloseModalButton = useRef();

  useEffect(() => {
    setData({
      title: selectedArticle?.title || "",
      category: selectedArticle?.category || "",
      description: selectedArticle?.description || "",
      content: selectedArticle?.content || "",
      articleTag: selectedArticle?.tags || [],
      isPublished: selectedArticle?.isPublished || false,
    });
  }, [selectedArticle]);

  const handleUpdateArticle = async () => {
    const updateArticleSuccess = await updateArticle(
      selectedArticle?.slug,
      data
    );
    if (!updateArticleSuccess) return;

    // close modal
    articleCloseModalButton.current.click();
  };

  const handleInsertArticleTag = (newItem) => {
    const trimmedItem = newItem.replace(/\s+/g, "");
    if (trimmedItem && !data.articleTag.includes(trimmedItem)) {
      setData({ ...data, articleTag: [...data.articleTag, trimmedItem] });
      articleTagInput.current.value = "";
    }
  };

  const handleRemoveArticleTag = (index) => {
    setData({
      ...data,
      articleTag: data.articleTag.filter((_, i) => i !== index),
    });
  };

  return (
    <div
      className="create-article-modal offcanvas offcanvas-end"
      tabIndex="-1"
      id="editArticleModal"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Update Knowledge Base Article
        </h5>
        <button
          type="button"
          ref={articleCloseModalButton}
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="row mt-3">
          <div className="col-12 col-md-6">
            <label htmlFor="article-title" className="form-label fw-medium">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="article-title"
              placeholder="Enter article title"
              value={data?.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="article-category" className="form-label fw-medium">
              Select Category
            </label>
            <select
              className="form-select"
              id="article-category"
              value={data?.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            >
              <option value="" hidden>
                Select a category
              </option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Account Access">Account Access</option>
              <option value="Hardware Request">Hardware Request</option>
              <option value="Software Installation">
                Software Installation
              </option>
              <option value="Network Problem">Network Problem</option>
              <option value="Maintenance Request">Maintenance Request</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="article-description" className="form-label fw-medium">
            Description
          </label>
          <textarea
            className="form-control"
            id="article-description"
            rows="3"
            placeholder="Brief description of the article"
            value={data?.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
        </div>

        <div className="mt-3">
          <label htmlFor="article-content" className="form-label fw-medium">
            Content
          </label>
          <textarea
            className="form-control"
            id="article-content"
            rows="8"
            placeholder="Write your article content here"
            value={data?.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
          ></textarea>
        </div>

        <div className="mt-3">
          <label htmlFor="article-tag" className="form-label fw-medium">
            Tag
          </label>
          <div className="row">
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                id="article-tag"
                placeholder="Add tags"
                ref={articleTagInput}
              />
            </div>
            <button
              onClick={() =>
                handleInsertArticleTag(articleTagInput.current.value)
              }
              className="btn btn-light border fw-medium col-2"
              type="button"
            >
              Add tag
            </button>
          </div>
        </div>

        <div className="d-flex gap-1 mt-1 flex-wrap">
          {data?.articleTag.map((tag, index) => (
            <div key={index} className="p-1">
              <div className="rounded-pill bg-primary-subtle text-primary f-size-12 px-2 py-1">
                {tag}{" "}
                <span
                  onClick={() => handleRemoveArticleTag(index)}
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                >
                  ×
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={data?.isPublished}
              onChange={(e) =>
                setData({ ...data, isPublished: e.target.checked })
              }
            />
            <label
              className="form-check-label fw-medium"
              htmlFor="flexSwitchCheckDefault"
            >
              Publish immediately
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-5">
          <button onClick={handleUpdateArticle} className="btn btn-primary">
            Confirm Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArticleModal;
