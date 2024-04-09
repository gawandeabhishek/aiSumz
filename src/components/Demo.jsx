import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("false");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem("article"));

    if (articleFromLocalStorage) {
      setAllArticles(articleFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      console.log(data);
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("article", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  };

  return (
    <section className="w-full flex items-center justify-center mt-10">
      {/* Search */}
      <div className="flex flex-col w-fit py-1 gap-2">
        <form
          className="flex justify-center items-center w-fit rounded-xl bg-gradient-to-tr from-sky-100/40 to-sky-100/30 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="my-2 ml-10 w-5 cursor-pointer"
          />
          <input
            type="url"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            placeholder="Enter a URL"
            className="outline-none md:w-[40rem] mx-5 bg-transparent truncate"
          />
          <button type="submit" className="text-xl text-slate-950 px-10">
            &#9166;
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 min-h-60 w-full mt-2">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="flex items-center justify-center gap-2 rounded-xl bg-sky-100/70 shadow-2xl p-4"
            >
              <div className="">
                <img
                  src={copied == item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-full object-contain"
                  onClick={() => handleCopy(item.url)}
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>

        {/* Display Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-slate-950 text-center">
              Well, that wasn't suppose to happen... <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article{" "}
                  <span className="bg-gradient-r from-sky-800 to-sky-300">
                    Summary
                  </span>
                </h2>
                <div className="w-full">
                  <p className="font-inter font-medium text-sm text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;
