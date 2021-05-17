import { React, useEffect, useState } from "react";
import { getOpenRequests } from "../../functions/courseRequest";
import  NotResolvedCard  from "../notResolvedeRequest/notResolved";
import {courseMarkedAsResolved} from '../../subjects/courseMarkedAsResolved'

function Dashboard() {
  const [openRequests, setOpenRequests] = useState([]);
  const [closedRequests, setClosedRequests] = useState([]);

  useEffect(async () => {
    window.scrollTo(0, 0);

    var openRequests = await getOpenRequests();
    if (openRequests && openRequests.length > 0) {
      setOpenRequests((prevArray) => []);
      openRequests.map((item, k) =>
        setOpenRequests((oldArray) => [...oldArray, item])
      );




      const subscription = courseMarkedAsResolved
      .onCourseMarkedAsResolvedChange()
      .subscribe((id) => {
        setOpenRequests((list) => list.filter((item) => item.id !== id));
      });



    }
  }, []);

  return (
    <div>
      {openRequests.map((item, k) => (
        <div>
            <NotResolvedCard item={item}/>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
