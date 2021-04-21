import React, { Component } from 'react'
import '../style/DetailCardStyle.css';
import defaultImage from '../assets/images/default-image.png';

class DetailCard extends Component {
    render() {
        
        const {
            photo,
            name,
            brand,
            domain,
            nbFaults,
            building,
            niveau,
            local,
            model,
            serialNumber,
            quantity,
            status,
            notes,
        } = this.props;
       
        return (
            <div className="detail-content">
                <div className="img-display">
                    {   
                        photo ?
                            <img
                                src={photo} 
                                alt={name}
                            />
                            :
                            <img
                                src={defaultImage} 
                                alt="default"
                            />
                    }
                </div>
                <div className="detail-card">
                    <div className="card-body">
                        <div className="ligne-top">
                            <h1 className="card-title">{name}</h1>
                            <h5>Quantité: {quantity}</h5>
                        </div>
                        <h3>{model}</h3>
                        <h6>Numéro de série: {serialNumber}</h6>
                        <br/>
                        <h5>Marque: <span>{brand}</span></h5>
                        <h5>Domaine: <span>{domain}</span></h5>
                        <h5>Nombre de défauts: <span>{nbFaults}</span></h5>
                        <h5>Nom du batiment: <span>{building}</span></h5>
                        <h5>Niveau ou se situe l'équipement: <span>{niveau}</span></h5>
                        <h5>Local ou se situe l'équipement: <span>{local}</span></h5>
                        <h5>Dernier statut constaté: <span>{status}</span></h5>
                        <br/>
                        <h5>Notes:</h5> <span>{notes}</span>
                    </div>
                </div>
            </div>
        )
    }
};

export default DetailCard;