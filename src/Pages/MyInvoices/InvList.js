import './InvList.css'
import InvCard from './InvCard'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import Loader from '../../Shared/Loader/Loader';
import {TextField, InputAdornment} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const InvList = () => {

    const [InvList, setInvList] = useState({theList: null})
    const authCtx = useContext(AuthContext)


    useEffect(() => {
        let myInvs = []
        db.collection('users').doc(authCtx.auth.user.uid).collection('userInvoices').onSnapshot((snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === "added"){
                    let docData = change.doc.data()
                    let id = change.doc.id
                    myInvs.push({docData, id})
                } if (change.type === "removed") {
                    myInvs = myInvs.filter(x => x.id !== change.doc.id) 
                } if (change.type === "modified") {
                    let myInvMod = myInvs.filter(x => x.id === change.doc.id)
                    let myInvsArr = myInvs.filter(x => x.id !== change.doc.id)
                    let id = change.doc.id
                    myInvsArr.push({myInvMod, id})
                    myInvs = myInvsArr
                }
            })
            myInvs = orderInvs(myInvs)
            setInvList({theList: myInvs, theListCopy: myInvs})
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authCtx])

    const compare = (a, b) => {
        if ( a.docData.invData.invNum < b.docData.invData.invNum ){
          return -1;
        }
        if ( a.docData.invData.invNum > b.docData.invData.invNum ){
          return 1;
        }
        return 0;
      }


    const orderInvs = myInvs => {
        myInvs = myInvs.sort(compare)
        return myInvs
    }

    const checkInv = (inv, word) => {
        let checked = false
        Object.values(inv).forEach(field => {
            Object.values(field).forEach(camp => {
                if (!Array.isArray(camp) && camp && camp.toString().toLowerCase().includes(word.toString().toLowerCase())) {
                    checked = true
                }
            })
        })
        return checked
    }

    const handleInputSearch = e => {
        const word = e.target.value
        const listCopy = InvList.theListCopy
        const listChoosen = []
        listCopy.forEach(inv => {
            if (checkInv(inv.docData, word)) {
                listChoosen.push(inv)
            }
        })
        setInvList({...InvList, theList: listChoosen})
    }

    return ( 
        <>
        <h3 style={{textAlign:"center"}}>Mis Facturas</h3>

        <div className="invListSearch">
        <TextField 
                label="Filtro de búsqueda"
                fullWidth={true}
                placeholder="Filtra por número de factura, cliente..."
                onChange={handleInputSearch}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}

        />
        </div>
        <br></br><br></br>
        {InvList.theList ?  InvList.theList.map((Inv, idx) => <InvCard key={idx} {...Inv} />): <Loader/>}
        </>
    );
}
 
export default InvList;