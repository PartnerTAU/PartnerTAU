import { React, useEffect, useState } from "react";
import { markAsResolved} from "../../functions/courseRequest"
import { courseMarkedAsResolved} from "../../subjects/courseMarkedAsResolved"



const NotResolved = ({item}) => {

    async function resolved(id)
    {
        const resp = await markAsResolved(id)

        if(resp && resp.isSuccess == true)
        {
            courseMarkedAsResolved.courseMarkedAsResolvedChange(id)
        }
    }


    return (
        <div className="cardNotResolved">
            <div style={{margin:'5px', backgroundColor:'blue',padding:'10px', borderRadius:'5px', color:'white', cursor:'pointer'}} onClick={() => resolved(item.id)}>סמן כנפתר</div>
            <div style={{margin:'5px'}}>קורס מוצע: {item.nameOffer} </div>
            <div style={{margin:'5px'}}>קורס מבוקש: {item.requested} </div>
            
        </div>
    )


}

export default NotResolved;