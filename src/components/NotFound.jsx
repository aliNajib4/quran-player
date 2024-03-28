import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
            <h2>الصفحة غير موجودة</h2>
          </div>
          <Link to="/">الصفحة الرئيسية</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
