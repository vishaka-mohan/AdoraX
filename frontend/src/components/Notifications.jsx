// import {NotificationItem} from "@pushprotocol/uiweb"

// function Notifications({notifications}){
//     return (
//     <div>
//     {notifications.map((oneNotification, i) => {
//         const { 
//         cta,
//         title,
//         message,
//         app,
//         icon,
//         image,
//         url,
//         blockchain,
//         secret,
//         notification
//         } = oneNotification;
    
//         return (
//           <NotificationItem
//             key={`notif-${i}`}
//             notificationTitle={secret ? notification['title'] : title}
//             notificationBody={secret ? notification['body'] : message}
//             cta={cta}
//             app={app}
//             icon={icon}
//             image={image}
//             url={url}
//             chainName={blockchain}
//           />
//         );
//     })}
//     </div>
//     )
// }

// export default Notifications