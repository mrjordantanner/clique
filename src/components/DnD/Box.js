// import { useDrag } from 'react-dnd';

// const ItemTypes = {
//     BOX: 'box',
//   }

// const style = {
//     border: '1px dashed gray',
//     backgroundColor: 'white',
//     padding: '0.5rem 1rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     cursor: 'move',
//     float: 'left',
// };

// export const Box = function Box({ name }) {
//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: ItemTypes.BOX,
//         item: { name },
//         end: (item, monitor) => {
//             const dropResult = monitor.getDropResult();
//             if (item && dropResult) {
//                 alert(`You dropped ${item.name} into ${dropResult.name}!`);
//             }
//         },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//             handlerId: monitor.getHandlerId(),
//         }),
//     }));
//     const opacity = isDragging ? 1 : 1;

//     return (

//         <div ref={drag} role="Box"  data-testid={`box-${name}`}>
//             <img src={Hex} alt='hexagon'/>
//         </div>

//     );
// };
