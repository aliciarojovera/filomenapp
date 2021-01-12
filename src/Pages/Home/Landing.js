import './Landing.css'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

const Landing = props => {
    console.log(props)
    return (
        <>
            <header className="hero" style={{ backgroundImage: `url(${props.img})` }}>
                <div className="content">
                    <p>{props.msg}</p>
                    {props.github ?
                        <> <a href="https://github.com/reneshibuya/filomenapp"><img alt="github" className="github" src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"></img></a><p className="small">Colabora en Github</p><br></br></>
                        : ""}
                    <br></br>

                    <Link to={props.to} className="newInvLink">

                        <Button
                            variant="contained"
                            color="secondary"

                            startIcon={<EditIcon />}

                        >
                            {props.btn}

                        </Button>

                    </Link>
                </div>
            </header>
        </>
    );
}

export default Landing;