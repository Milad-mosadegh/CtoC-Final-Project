import React from 'react';
import {OverlayTrigger, Popover, Button} from "react-bootstrap"

const NewMessage = (props) => {
    const {title}=props
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
              <Button>Send</Button>
            </Popover.Content>
          </Popover>
        }
      >
        <div className="myIcons fa fa-envelope-o" variant="secondary"></div>
      </OverlayTrigger>{' '}
    </> );
}
 
export default NewMessage;