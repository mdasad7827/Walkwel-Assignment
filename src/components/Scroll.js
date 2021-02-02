import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import data from "./data.json";
import { Col, Row, Table } from "reactstrap";
import TableRow from "./TableRow";
import Search from "./Search";
import DropdownCity from "./DropdownCity";
import DropdownGender from "./DropdownGender";

function TableData() {
  const dataArr = data.data;
  const [arr, setArr] = useState([...dataArr]);
  const [iq, setIq] = useState(0);
  const [genderArr, setGenderArr] = useState([]);
  const [gender, setGender] = useState("Gender");
  const [cityArr, setCityArr] = useState([]);
  const [city, setCity] = useState("City");

  const [count, setCount] = useState({
    prev: 0,
    next: 100,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(
    ...[arr.slice(count.prev, count.next)]
  );

  useEffect(() => {
    let currIq = 0;
    const length = arr.length;
    arr.forEach((item) => {
      currIq += item.iq;
    });
    const finalIq = (currIq / length).toFixed(2);
    setIq(isNaN(finalIq) ? 0 : finalIq);
  }, [current]);

  const getMoreData = () => {
    if (current.length >= arr.length) {
      setHasMore(false);
      return;
    }

    setCurrent(
      current.concat(...[arr.slice(count.prev + 100, count.next + 100)])
    );
    setCount((prevState) => ({
      prev: prevState.prev + 100,
      next: prevState.next + 100,
    }));
  };
  const searchItem = (val) => {
    console.log("searchItem ran");
    setCount({
      prev: 0,
      next: 100,
    });
    const filteredArr = dataArr.filter(
      (data) =>
        data.firstName.toLowerCase().indexOf(val) !== -1 ||
        data.lastName.toLowerCase().indexOf(val) !== -1 ||
        data.email.toLowerCase().indexOf(val) !== -1
    );
    setArr(filteredArr);
  };

  useEffect(() => {
    setCurrent(...[arr.slice(count.prev, count.next)]);
  }, [arr]);

  useEffect(() => {
    current.forEach((item) => {
      if (!cityArr.includes(item.city)) {
        cityArr.push(item.city);
      }
    });
    dataArr.forEach((item) => {
      if (!genderArr.includes(item.gender)) {
        genderArr.push(item.gender);
      }
    });

    setGenderArr([...genderArr]);
    setCityArr([...cityArr]);
  }, [current, dataArr]);

  const reset = () => {
    setCount({
      prev: 0,
      next: 100,
    });
    setArr([...dataArr]);
    setHasMore(true);
    setGender("Gender");
    setCity("City");
  };

  const changeCity = (val) => {
    const filteredArr = dataArr.filter((data) => data.city === val);
    setCount({
      prev: 0,
      next: 100,
    });
    setHasMore(true);
    setCity(val);
    setArr(filteredArr);
  };

  const changeGender = (val) => {
    const filteredArr = dataArr.filter((data) => data.gender === val);
    setCount({
      prev: 0,
      next: 100,
    });
    setHasMore(true);
    setGender(val);
    setArr(filteredArr);
  };

  return (
    <>
      <Row>
        <Search searchItem={searchItem} reset={reset} />
      </Row>
      <Row className="mt-5">
        <Col>
          <InfiniteScroll
            style={{ minHeight: "600px" }}
            dataLength={current.length}
            next={getMoreData}
            hasMore={hasMore}
            loader={""}
          >
            <Table
              striped
              bordered
              size="sm"
              style={{ width: "90%", margin: "auto", backgroundColor: "white" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>D.O.B</th>
                  <th>Address</th>
                  <th>
                    <DropdownCity
                      city={city}
                      cityArr={cityArr}
                      changeCity={changeCity}
                    />
                  </th>
                  <th>
                    <DropdownGender
                      gender={gender}
                      genderArr={genderArr}
                      changeGender={changeGender}
                    />
                  </th>
                  <th>IQ</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Average IQ</th>
                  <th>{iq}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {current &&
                  current.map((item, idx) => {
                    return <TableRow item={item} idx={idx} key={idx} />;
                  })}
              </tbody>
            </Table>
          </InfiniteScroll>
        </Col>
      </Row>
    </>
  );
}
export default TableData;
