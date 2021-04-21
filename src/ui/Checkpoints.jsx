import React, { Component } from 'react'
import '../style/DetailCardStyle.css';

class CheckPoints extends Component {
    render() {
        
        const {
            checkpoints,
            fromCsv
        } = this.props;
        
        return (
             <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Nom Point de contrôle</th>
                    <th scope="col">Nom défaut</th>
                    <th scope="col">Préconisation</th>
                    </tr>
                </thead>
                <tbody>
                    { !fromCsv ?
                        checkpoints && checkpoints.map(cp=> {
                                return(
                                <tr key={cp.key}>
                                    <td>{cp.value.name && cp.value.name !== "" ? cp.value.name : "/"}</td>
                                    <td>{cp.value.fault && cp.value.fault !== "" ? cp.value.fault : "/"}</td>
                                    <td>{cp.value.recommandation && cp.value.recommandation !== "" ? cp.value.recommandation : "/"}</td>
                                </tr>
                                );
                            })
                        :
                        checkpoints && checkpoints.map(cp => {
                                return(
                                <tr key={cp.key}>
                                    <td>{cp.name && cp.name !== "" ? cp.name : "/"}</td>
                                    <td>{cp.fault && cp.fault !== "" ? cp.fault : "/"}</td>
                                    <td>{cp.recommandation && cp.recommandation !== "" ? cp.recommandation : "/"}</td>
                                </tr>
                                );
                            })
                    }
                </tbody>
                </table>
        )
    }
};

export default CheckPoints;