import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../assets/images/default-image.png';

class EquipmentCard extends Component {

    render() {
        
        const {
            equipmentId,
            name,
            domain,
            photo,
            nbFaults,
            brand
        } = this.props;
       
        return (
            <Link to= {{     
                pathname: '/equipmentDetail',
                state: {equipmentId: equipmentId}
            }}        
            >
                <div className="card">
                    <div className="overlay">
                        { photo && photo !== undefined ?
                            <img
                            className="board-img card-img-top"
                                src={photo} 
                                alt={name}
                            />
                            :
                            <img
                                className="board-img card-img-top"
                                src={defaultImage} 
                                alt="default"
                            />
                        }

                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{domain}</p>
                            <p className="card-text">{brand}</p>
                            <p className="fault-text">Nombre de défauts: {nbFaults}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
};

export default EquipmentCard;