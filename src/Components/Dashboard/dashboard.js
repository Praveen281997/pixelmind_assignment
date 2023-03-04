import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Api from "./../../Api/Api";
import Popup from "../popup";

function Dashboard(props) {
  const [cardData, setCardData] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    Api.getBallotData().then((res) => setCardData(res.items));
  }, []);

  const markSelected = (data, id) => {
    const _tmp = [...cardData];
    let outerIdIndex = _tmp.findIndex((i) => i.id === id);
    if (outerIdIndex !== -1) {
      console.log(_tmp[outerIdIndex]);
      let markSelectIndex = _tmp[outerIdIndex].items.findIndex(
        (innerItem) => innerItem.id === data.id
      );
      _tmp[outerIdIndex].items.forEach((i, key) => {
        if (key !== markSelectIndex && i.isSelected) {
          i.isSelected = false;
        }
      });
      if (_tmp[outerIdIndex].items[markSelectIndex].isSelected) {
        _tmp[outerIdIndex].items[markSelectIndex].isSelected = false;
      } else {
        _tmp[outerIdIndex].items[markSelectIndex].isSelected = true;
      }
      setCardData(_tmp);
    }
  };

  const onSubmitClick = () => {
    console.log("you have clicked the final submit button");
    setClick(true);
  };

 
  const onClose = () => {
    setClick(false);
  };

  return (
    <div className="dashboard">
      {cardData.map((i, catKey) => (
        <div key={catKey}>
          <div className="category">{i.title}</div>
          <div className="card-section">
            {i.items.map((crds, cardsKey) => (
              <div
                class="card"
                style={{ backgroundColor: crds.isSelected ? "#009B86" : "" }}
              >
                <h4>Nominees</h4>
                <img className="img-section" src={crds.photoUrL} alt="Avatar" />

                <button onClick={() => markSelected(crds, i.id)}>Select</button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={onSubmitClick}
        style={{
          backgroundColor: "yellow",
          width: "10%",
          padding: "15px",
          marginBottom: "10px",
          marginRight: "10px",
          float: "right",
        }}
      >
        SUBMIT BALLOT BUTTON
      </button>

      {click && <Popup close={onClose} />}
    </div>
  );
}

export default Dashboard;
