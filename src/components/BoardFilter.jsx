import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterAction } from '../store/actions/app';
import { useSetState } from '../hooks/customHook';

export function BoardFilter() {
    
    // Return distinct values from an array
    const arrayToDistinct = (inArray, out) => {
        // eslint-disable-next-line array-callback-return
        inArray.map(item => {    
            if(item !== "") {
                var findItem = out.find(x => x === item);
                if (!findItem)
                    out.push(item);
            }              
        });      
    };

    // Init firebase and csv data
    const equipments = useSelector(state => state.firebase.ordered.Equipments);
    const getEquipmentsFromCsv = useSelector((state) => state.equipmentCsv.equipments);
    
    // Init domains from firebase or csv data
    const domains = equipments && equipments.length > 0 ?  
        equipments.map(e => e.value.domain) : 
        getEquipmentsFromCsv && getEquipmentsFromCsv.length > 0 ? 
        getEquipmentsFromCsv.map(e => e.domain) : [];
    
    // Init brands from firebase or csv data
    const brands = equipments && equipments.length > 0 ?  
        equipments.map(e => e.value.brand) : 
        getEquipmentsFromCsv && getEquipmentsFromCsv.length > 0 ? 
        getEquipmentsFromCsv.map(e => e.brand) : [];
    
    const domainsDistinct = [];
    arrayToDistinct(domains, domainsDistinct);

    const brandsDistinct = [];
    arrayToDistinct(brands, brandsDistinct);

    const [search, setSearch] = useState('');
    const [domain, setDomainSelected] = useState('');
    const [brand, setBrandSelected] = useState('');
    // eslint-disable-next-line no-unused-vars
    let  [listFiltered, setlistFiltered, getlistFiltered] = useSetState([]);
    let isActive = false;

    const dispatch = useDispatch();
  
    
    useEffect(() => {
        // Full filters
        if(equipments && equipments.length > 0 && (domain !== '' || brand !== '')){
            setlistFiltered (
                equipments.filter(d => d.value.name.toLowerCase().includes(search.toLowerCase() !== "" ? search.toLowerCase() : d.value.name.toLowerCase())
                && (d.value.domain === (domain !== "" && domain !== "DOMAINES" ? domain : d.value.domain))
                && (d.value.brand === (brand !== "" && brand !== "MARQUES" ? brand : d.value.brand))
                )
            );

            // eslint-disable-next-line react-hooks/exhaustive-deps
            isActive = true;

        } else if (getEquipmentsFromCsv && getEquipmentsFromCsv.length > 0 ){
            setlistFiltered (
                getEquipmentsFromCsv.filter(d => d.name  && d.name.toLowerCase().includes(search.toLowerCase() !== "" ? search.toLowerCase() : d.name.toLowerCase())
                && (d.domain === (domain !== "" && domain !== "DOMAINES" ? domain : d.domain))
                && (d.brand === (brand !== "" && brand !== "MARQUES" ? brand : d.brand))
                )
            ); 
            isActive = true;
        };

        // Name filter
        if((domain === '' || domain === 'DOMAINES')  && (brand === '' || brand === 'MARQUES')) {
            if(equipments && equipments.length > 0 ){
                setlistFiltered (
                    equipments.filter(d => d.value.name  && d.value.name.toLowerCase().includes(search.toLowerCase() !== "" ? search.toLowerCase() : d.value.name.toLowerCase()))
                );
                isActive = true;
            } else if (getEquipmentsFromCsv && getEquipmentsFromCsv.length > 0 ){
                setlistFiltered (
                    getEquipmentsFromCsv.filter(d => d.name  && d.name.toLowerCase().includes(search.toLowerCase() !== "" ? search.toLowerCase() : d.name.toLowerCase()))
                ); 
                isActive = true;
            };
        }      
        handleOnChange(isActive);
    }, [search, domain, brand]);

    const handleOnChange = useCallback( async (isActive) => {
        dispatch(updateFilterAction(await getlistFiltered(), isActive))
        },[dispatch, getlistFiltered]
    );

    return (
        <div className="filter-box">
            <div className="text-center">
                <h2>Filtrer</h2>
                <hr/>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Filtrer par nom</span>
                </div>
                <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} />
                <div className="select-domain">
                    <select className="custom-select" value={domain} onChange={e => setDomainSelected(e.target.value)} >
                        <option defaultValue>DOMAINES</option>
                        { domainsDistinct.map(domain => {
                            return <option key={domain}>{domain}</option>
                            })
                        }
                    </select>
                </div>
                <div className="select-brand">
                    <select className="custom-select" value={brand} onChange={e => setBrandSelected(e.target.value)} >
                        <option defaultValue>MARQUES</option>
                        { brandsDistinct.map(brand => {
                            return <option key={brand}>{brand}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    )  
}