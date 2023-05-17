const AccordianItem = ({
  accordianHandler,
  isActive,
  question,
  answer,
  id,
}) => {
  const tabHandler = () => {
    if (!isActive) {
      accordianHandler(id);
    } else {
      accordianHandler(-1);
    }
  };

  return (
    <li onClick={tabHandler}>
      <h2 className="flex justify-between p-6 text-2xl bg-[#132144] hover:bg-[#223362]">
        <button>{question}</button>
        <span>
          {!isActive ? <AccordianOpenIcon /> : <AccordianCloseIcon />}
        </span>
      </h2>
      <p
        className={`${
          isActive
            ? "bg-[#132144] p-6 text-2xl divide-solid divide-y-2 "
            : "hidden transition-all delay-75 ease-in-out"
        } `}
      >
        {answer}
      </p>
    </li>
  );
};

const AccordianOpenIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        :
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </>
  );
};

const AccordianCloseIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </>
  );
};

export default AccordianItem;