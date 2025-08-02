import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WatchList.module.css";

const initialStocks = [
  { name: "INFY", price: 1555.45 },
  { name: "ONGC", price: 116.8 },
  { name: "TCS", price: 3194.8 },
  { name: "HDFCBANK", price: 1578.1 },
  { name: "ITC", price: 439.7 },
  { name: "RELIANCE", price: 2892.0 },
  { name: "SBIN", price: 725.6 },
  { name: "WIPRO", price: 462.3 },
  { name: "HCLTECH", price: 1401.5 },
  { name: "ADANIENT", price: 2824.0 },
];

const getRandomChange = () => +(Math.random() * 3 - 1.5).toFixed(2);

const WatchList = () => {
  const [stocks, setStocks] = useState(
    initialStocks.map((stock) => ({
      ...stock,
      percent: "0.00%",
      isDown: false,
    }))
  );

  const [activeStock, setActiveStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState("BUY");

  const [isMobileOpen, setIsMobileOpen] = useState(false); // for mobile sidebar toggle

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const changePercent = getRandomChange();
          const changeAmount = (stock.price * changePercent) / 100;
          const newPrice = +(stock.price + changeAmount).toFixed(2);

          return {
            ...stock,
            price: newPrice,
            percent: `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
            isDown: changePercent < 0,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const openPopup = (stockName, actionMode) => {
    setActiveStock(stockName);
    setMode(actionMode);
    setQuantity(1);
  };

  const handleConfirm = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const stock = stocks.find((s) => s.name === activeStock);

    try {
      await axios.post("http://localhost:3000/newOrder", {
        name: activeStock,
        qty: quantity,
        price: stock.price,
        mode,
        user: userId,
      });

      alert(`${mode} ${quantity} of ${activeStock} at ₹${stock.price}`);
    } catch (err) {
      console.error(`${mode} error:`, err);
      alert(`Failed to place ${mode} order.`);
    }

    setActiveStock(null);
  };

  const handleCancel = () => {
    setActiveStock(null);
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <div className={styles.hamburger} onClick={() => setIsMobileOpen(!isMobileOpen)}>
        watchlist
      </div>

      <div
        className={`${styles.watchlistContainer} ${
          isMobileOpen ? styles.open : styles.closed
        }`}
      >
        <h2 className={styles.heading}>Watchlist</h2>
        <ul className={styles.watchlist}>
          {stocks.map((stock) => (
            <li key={stock.name} className={styles.stockItem}>
              <span className={styles.stockName}>{stock.name}</span>
              <span style={{ color: stock.isDown ? "red" : "lightgreen" }}>
                ₹{stock.price.toFixed(2)} ({stock.percent})
              </span>
              <div className={styles.actionButtons}>
                <button
                  className={styles.buyButton}
                  onClick={() => openPopup(stock.name, "BUY")}
                >
                  Buy
                </button>
                <button
                  className={styles.sellButton}
                  onClick={() => openPopup(stock.name, "SELL")}
                >
                  Sell
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {activeStock && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>
              {mode} {activeStock}
            </h3>
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </label>
            <div className={styles.popupButtons}>
              <button onClick={handleConfirm} className={styles.confirmBtn}>
                Confirm {mode}
              </button>
              <button onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchList;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./WatchList.module.css";

// const initialStocks = [
//   { name: "INFY", price: 1555.45 },
//   { name: "ONGC", price: 116.8 },
//   { name: "TCS", price: 3194.8 },
//   { name: "HDFCBANK", price: 1578.1 },
//   { name: "ITC", price: 439.7 },
//   { name: "RELIANCE", price: 2892.0 },
//   { name: "SBIN", price: 725.6 },
//   { name: "WIPRO", price: 462.3 },
//   { name: "HCLTECH", price: 1401.5 },
//   { name: "ADANIENT", price: 2824.0 },
// ];


// const getRandomChange = () => +(Math.random() * 3 - 1.5).toFixed(2);

// const WatchList = () => {
//   const [stocks, setStocks] = useState(
//     initialStocks.map((stock) => ({
//       ...stock,
//       percent: "0.00%",
//       isDown: false,
//     }))
//   );

//   const [activeStock, setActiveStock] = useState(null); // name of stock
//   const [quantity, setQuantity] = useState(1);
//   const [mode, setMode] = useState("BUY");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStocks((prevStocks) =>
//         prevStocks.map((stock) => {
//           const changePercent = getRandomChange();
//           const changeAmount = (stock.price * changePercent) / 100;
//           const newPrice = +(stock.price + changeAmount).toFixed(2);

//           return {
//             ...stock,
//             price: newPrice,
//             percent: `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
//             isDown: changePercent < 0,
//           };
//         })
//       );
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const openPopup = (stockName, actionMode) => {
//     setActiveStock(stockName);
//     setMode(actionMode);
//     setQuantity(1);
//   };

//   const handleConfirm = async () => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       alert("User not logged in");
//       return;
//     }

//     const stock = stocks.find((s) => s.name === activeStock);

//     try {
//       await axios.post("http://localhost:3000/newOrder", {
//         name: activeStock,
//         qty: quantity,
//         price: stock.price,
//         mode,
//         user: userId,
//       });

//       alert(`${mode} ${quantity} of ${activeStock} at ₹${stock.price}`);
//     } catch (err) {
//       console.error(`${mode} error:`, err);
//       alert(`Failed to place ${mode} order.`);
//     }

//     setActiveStock(null);
//   };

//   const handleCancel = () => {
//     setActiveStock(null);
//   };

//   return (
//     <div className={styles.watchlistContainer}>
//       <h2 className={styles.heading}>Watchlist</h2>
//       <ul className={styles.watchlist}>
//         {stocks.map((stock) => (
//           <li key={stock.name} className={styles.stockItem}>
//             <span className={styles.stockName}>{stock.name}</span>
//             <span style={{ color: stock.isDown ? "red" : "lightgreen" }}>
//               ₹{stock.price.toFixed(2)} ({stock.percent})
//             </span>
//             <div className={styles.actionButtons}>
//               <button
//                 className={styles.buyButton}
//                 onClick={() => openPopup(stock.name, "BUY")}
//               >
//                 Buy
//               </button>
//               <button
//                 className={styles.sellButton}
//                 onClick={() => openPopup(stock.name, "SELL")}
//               >
//                 Sell
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {activeStock && (
//         <div className={styles.popupOverlay}>
//           <div className={styles.popup}>
//             <h3>{mode} {activeStock}</h3>
//             <label>
//               Quantity:
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Number(e.target.value))}
//               />
//             </label>
//             <div className={styles.popupButtons}>
//               <button onClick={handleConfirm} className={styles.confirmBtn}>
//                 Confirm {mode}
//               </button>
//               <button onClick={handleCancel} className={styles.cancelBtn}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WatchList;
