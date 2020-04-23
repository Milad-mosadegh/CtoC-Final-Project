import React from 'react';
import {OverlayTrigger, Popover, Button} from "react-bootstrap"

const NewMessage = (props) => {
    const {title, productId, recipentId}=props
    return ( <>
    <OverlayTrigger
        trigger="click"
        key="top"
        placement="top"
        overlay={
          <Popover id={`popover-positioned-top`}>
            <Popover.Title as="h3">{title}</Popover.Title>
            <Popover.Content>
              <input type="text"/><br/>
              <Button onClick={()=>console.log("in new message",title,recipentId,productId)}>Send</Button>
            </Popover.Content>
          </Popover>
        }
      >
        <div className="myIcons fa fa-envelope-o" variant="secondary"></div>
      </OverlayTrigger>{' '}
    </> );
}
 
export default NewMessage;