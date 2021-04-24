// import React from 'react';
// import Channel from './Channel';

// export default function ChannelList(props) {

//     // Maps over array of channels and renders individual channel components



//     return (
//         <div className='channelList'>
//             {props.channels.length > 0 ?
//                 props.channels.map(c => 
//                     <Channel 
//                         key={c._id} 
//                         id={c._id} 
//                         name={c.name} 
//                         // participants={c.participants} 
//                         messages={c.messages}
//                         onClick={handleClick}
//                     />) :
//                 <div>No channels</div>
//             }
//         </div>);
// }