import { useMemo } from "react";
import { useArticleStore } from "../../store/useArticleStore";

const ArticleStatCards = () => {
  const { articles } = useArticleStore();

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => a.isPublished === true);
  }, [articles]);

  const totalArticles = useMemo(() => {
    return filteredArticles.filter((a) => a.isPublished === true).length;
  }, [filteredArticles]);

  const totalViews = useMemo(() => {
    return filteredArticles.reduce((sum, article) => sum + article.views, 0);
  }, [filteredArticles]);

  const avgRatings =
    useMemo(() => {
      return (
        filteredArticles.reduce((sum, article) => sum + article.ratings.average, 0) / filteredArticles.length || 0
      );
    }, [filteredArticles]) ?? 0;

  const totalContributors = useMemo(() => {
    const uniqueNames = new Set(
      filteredArticles.map((article) => article.author.name)
    );
    return uniqueNames.size;
  }, [articles]);

  return (
    <div className="row">
      <div className="p-2 col-12 col-md-6 col-lg-3">
        <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
          <div className="bg-primary-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center">
            <i className="text-primary bi bi-book reports-card-icon"></i>
          </div>
          <div>
            <div className="text-muted fw-medium">Total Articles</div>
            <h4 className="fw-bold m-0">{totalArticles}</h4>
          </div>
        </div>
      </div>
      <div className="p-2 col-12 col-md-6 col-lg-3 ">
        <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
          <div className="bg-success-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center">
            <i className="text-success bi bi-eye reports-card-icon"></i>
          </div>
          <div>
            <div className="text-muted fw-medium">Total Views</div>
            <h4 className="fw-bold m-0">{totalViews}</h4>
          </div>
        </div>
      </div>
      <div className="p-2 col-12 col-md-6 col-lg-3 ">
        <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
          <div className="bg-warning-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center">
            <i className="text-warning bi bi-star reports-card-icon"></i>
          </div>
          <div>
            <div className="text-muted fw-medium">Avg Rating</div>
            <h4 className="fw-bold m-0">{avgRatings.toFixed(1)}</h4>
          </div>
        </div>
      </div>
      <div className="p-2 col-12 col-md-6 col-lg-3 ">
        <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
          <div className="bg-violet-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center">
            <i className="text-violet bi bi-people reports-card-icon"></i>
          </div>
          <div>
            <div className="text-muted fw-medium">Contributors</div>
            <h4 className="fw-bold m-0">{totalContributors}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleStatCards;
