const PreviewCard = ({ contentPoster }) => {
  return (
    <div className="flex-none w-48">
      <img src={contentPoster} alt="video" className="rounded" />
    </div>
  );
};

export default PreviewCard;