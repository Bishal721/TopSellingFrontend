import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { SpinnerImage } from "../components/loader/Loader";
import { getTopCustomers } from "../fetch/fetchService";
import { shortenText } from "./Products";

const TopCustomers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(customers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(customers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, customers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await getTopCustomers();
        setCustomers(customers);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);
  return (
    <div className="text-[#333]">
      <hr />
      <div className="p-[5px] w-full overflow-x-auto">
        <div className="flex justify-between items-center ">
          <span>
            <h3 className="md:text-2xl">Top Customers List</h3>
          </span>
        </div>
        {isLoading && <SpinnerImage />}

        <div className="p-[5px] w-full overflow-x-auto">
          {!isLoading && customers.length === 0 ? (
            <p>
              <b>"No Customers Found, Please Add a Customers"</b>
            </p>
          ) : (
            <table className="p-[5px] w-full overflow-x-auto">
              <thead className="border-t-[2px_solid_#1f93ff] border-b-[2px_solid_#1f93ff]">
                <tr>
                  <th scope="col" className="align-top text-left p-[8px]">
                    s/n
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Id
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Name
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Email
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Phone No.
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Number of Purchases
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((cust, index) => {
                  const { customerId, name, email, phoneNumber } = cust;
                  return (
                    <tr
                      key={customerId}
                      className="hover:cursor-pointer hover:bg-[rgba(31,_147,_255,_0.3)]"
                    >
                      <td className="align-top text-left p-[8px]">
                        {index + 1}
                      </td>
                      <td className="align-top text-left p-[8px">
                        {shortenText(customerId, 16)}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {shortenText(name, 16)}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {shortenText(email, 16)}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {shortenText(phoneNumber, 16)}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {cust.purchases.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {/* Paginate */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </div>
  );
};

export default TopCustomers;
