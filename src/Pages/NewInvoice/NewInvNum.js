import { useContext, useState } from 'react'
import './NewInvNum.css'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {TextField, InputAdornment} from '@material-ui/core'
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';

const NewInvNum = props => {

    const [, setNum] = useState(props.value)

    const authCtx = useContext(AuthContext)

    const addNum = invNum => {
        let invNumFirst = invNum.split('-', 1)
        let invNumNum = invNum.split('-').pop()

        invNumNum = +invNumNum + 1 

        var str = "" + invNumNum
        var pad = "0000"
        var ans = pad.substring(0, pad.length - str.length) + str

        let invNumFinal = invNumFirst + "-" + ans

        return invNumFinal
    }

    const handleGen = () => {
        db.collection('users').doc(authCtx.auth.user.uid).collection('userInvoices').get().then((res) => {
            if (res.empty){
                var d = new Date();
                var n = d.getFullYear();
                var g = n + "-0001"
                setNum({num: g})
                props.onGen(g)
            } else {
                let maxNum = 0
                let maxNumAll = ""
                res.docs.forEach((doc) => {
                    let invNum = doc.data().invData.invNum
                    let invNumInt = invNum.split('-').pop()
                    if (invNumInt > maxNum) {
                        maxNum = invNumInt
                        maxNumAll = invNum
                    }
                })
                let numFinal = addNum(maxNumAll)
                setNum({num: numFinal})
                props.onGen(numFinal)
            }
        })
    }

    return (
        <>
            <div className="newInvNum">
            <br></br>
                <p className="newInvNumTitle" style={{textAlign:"center"}}>Número de factura</p>
                <div className="newInvField">
                    <div className="newInvGen" onClick={handleGen}>
                        <p className="newInvLabel">GENERAR</p>
                        <AddCircleOutlineIcon className="newInvNumIcon"/>
                    </div>
                    <TextField
                    multiline
                    className="textField"
                    defaultValue={props.value && props.value}
                    name=""
                    size="small"
                    fullWidth={true}
                    label="Número de factura"
                    placeholder="Número de factura"
                    onChange={props.onChange}
                    InputProps={{startAdornment: (<InputAdornment position="start"><ReceiptIcon/></InputAdornment>),}}
                    />
                </div>
                <br></br>
            </div>
        </>
    )
}

export default NewInvNum