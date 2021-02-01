import React, { useEffect, useState } from "react";
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
  // console.log(arr);
  const [iq, setIq] = useState("");
  const [genderArr, setGenderArr] = useState([]);
  const [gender, setGender] = useState("Gender");
  const [cityArr, setCityArr] = useState([]);
  const [city, setCity] = useState("City");

  const [count, setCount] = useState({
    prev: 0,
    next: 50,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(
    ...[arr.slice(count.prev, count.next)]
  );

  useEffect(() => {
    let currIq = 0;
    const length = current.length;
    current.forEach((item) => {
      currIq += item.iq;
    });
    const finalIq = (currIq / length).toFixed(2);
    setIq(finalIq);
  }, [current]);
  // console.log("curArr>", current);
  const getMoreData = () => {
    if (current.length >= arr.length) {
      setHasMore(false);
      return;
    }

    setCurrent(current.concat(arr.slice(count.prev + 50, count.next + 50)));
    setCount((prevState) => ({
      prev: prevState.prev + 50,
      next: prevState.next + 50,
    }));
  };
  const searchItem = (val) => {
    setCount({
      prev: 0,
      next: 50,
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
    setCurrent(arr.slice(count.prev, count.next));
  }, [arr]);

  useEffect(() => {
    const genderSet = new Set();
    current.forEach((item) => {
      genderSet.add(item.gender);
    });
    genderSet.forEach((i) => genderArr.push(i));
    setGenderArr([...genderArr]);
    // console.log(genderArr);
    const citySet = new Set();
    current.forEach((item) => {
      citySet.add(item.city);
    });
    citySet.forEach((i) => cityArr.push(i));
    setCityArr([...cityArr]);
  }, []);

  const reset = () => {
    setCount({
      prev: 0,
      next: 50,
    });
    setArr([...dataArr]);
    setHasMore(true);
    setGender("Gender");
    setCity("City");
  };

  const changeCity = (val) => {
    const filteredArr = dataArr.filter((data) => data.city === val);
    setArr(filteredArr);
  };

  const changeGender = (val) => {
    const filteredArr = dataArr.filter((data) => data.gender === val);
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
            <Table striped size="sm">
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
                      setCity={setCity}
                      cityArr={cityArr}
                      changeCity={changeCity}
                    />
                  </th>
                  <th>
                    <DropdownGender
                      gender={gender}
                      setGender={setGender}
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
