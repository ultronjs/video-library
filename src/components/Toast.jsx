import React from 'react'

function Toast({type,msg}) {
    const variantOfToast = {
      Success: ["toast_success", "fa-shield-check"],
      Info: ["toast_info", "fa-info-circle"],
      Warning: ["toast_warning", "fa-exclamation-circle"],
      Error: ["toast_error", "fa-times-circle"],
    };
  return (
    <div className="toast_wrapper toast_rightside my-x-small">
      <div className={`toast ${variantOfToast[type][0]}`}>
        <i className={`far ${variantOfToast[type][1]} fa-2x toast_icon`}></i>
        <div className="toast_content">
          <span className="toast_heading">{type}</span>
          <span className="toast_body">{msg}</span>
        </div>
        <i className="far fa-times-circle fa-lg toast_dismiss"></i>
      </div>
    </div>
  );
}

export default Toast