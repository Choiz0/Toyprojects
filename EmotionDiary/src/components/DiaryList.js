import React,{ useState,useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from './DiaryItem';

const sortOptionList = [
  { value: "latest", name: "Latest" },
  { value: "oldest", name: "Oldest" },
];

const filterOptionList = [
  { value: "all", name: "All" },
  { value: "good", name: "Good Feeling" },
  { value: "bad", name: "Bad Feeling" },
];

const ContolMenu = ({ value, onChange, optionList }) => {
  
  
  return (
    <select
      className="ContolMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setfilter] = useState("all");

  const filterCallBack = (item) => {
    if (filter === "good") {
      return parseInt(item.emotion) <= 3;
    } else {
      return parseInt(item.emotion) > 3;
    }
  };

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (

    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ContolMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ContolMenu
            value={filter}
            onChange={setfilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"Adding New Diary"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
      <DiaryItem key={it.id} {...it}/>
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
