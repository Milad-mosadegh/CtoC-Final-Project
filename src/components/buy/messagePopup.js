import React from 'react'
import TextField from '@material-ui/core/TextField';
import '../styles/main.css'

function ProductMessage({ proceedHandler, hideAlertBox, simpleAlert, cancelButtonBody }) {
    return (
        <div className="pdm">
        <div className="pdm-content">
            <div className="pdm-head">
            </div>
            <div className="pdm-head-title">
                Message
            </div>

            <div className="pdm-tilte">
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    name="description"
                    // value={product.description}
                    // onChange={changeHandler}
                    multiline
                    rows={4}
                    placeholder="Write Your Message Here"
                    variant="outlined"
                    className="mb-3 col-lg-12 col-md-12 col-sm-12"
                    fullWidth={true}

                />
            </div>
            {simpleAlert ?
                <button type="button" className="myBlueButton-sm" onClick={hideAlertBox}>Ok</button>
                :
                <div className="alertBox-body">
                    <button type="button" className="myBlueButton-sm" onClick={proceedHandler}>Yes   </button>

                    {cancelButtonBody ?
                        <button type="button" className="myRedButton-sm ml-1" onClick={hideAlertBox}>{cancelButtonBody}</button>
                        : <button type="button" className="myRedButton-sm ml-1" onClick={hideAlertBox}>Cancel</button>}
                </div>
            }
            </div>
        </div>
    )
}

export default ProductMessage
