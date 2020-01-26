import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Header from '../../Components/Header/Header'
import Dropzone from 'react-dropzone'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import api from '../../services/api'
import './styles.css'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 1150,
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),

  },
  paper: {
    maxWidth: 600,
    // margin: `${theme.spacing(1)}px auto`,
    // padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [file, setFile] = React.useState(null);

  //Questionario
  const [q1, setQ1] = React.useState('');
  const [q2, setQ2] = React.useState('');
  const [q3, setQ3] = React.useState('');
  const [q4, setQ4] = React.useState('');
  const [obs, setObs] = React.useState('');
  const [box, setBox] = React.useState({})
  const [cont, setCont] = React.useState(0)
  const [state, setState] = React.useState({
    checkedA: true
  });

  function onChangeSetaFile(e) {
    setFile(e.target.files[0])
    console.log(JSON.stringify(file));
  }


  async function handleSubmit(event) {
    event.preventDefault()
    const data = {
      q1,
      q2,
      q3,
      q4,
      obs
    }
    alert('foi')
    const response = await api.post('/report', data);
    localStorage.setItem('id', response.data._id)
    alert('ch')
    setCont(1);
    window.location.reload()
    // handleUpload()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function handleUpload(files) {
    // if (cont == 0) {
    //   return;
    // }
    // files.forEach(file => {
    //   const data = new FormData()
    //   const id = localStorage.getItem('id')

    //   data.append('file', file)
    //   api.post(`/report/${id}/files`, data).then(success => {
    //     alert('deu bom')
    //   }).catch(error => {
    //     console.log(error.response.data)
    //   })
    //   window.location.reload()

    // const formData = new FormData();
    // const id = localStorage.getItem('id');
    // formData.append('file', file);
    // await api.post(`/report/${id}/files`, formData);
    // props.history.push('/');
  }

  const handleChangeCheck = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: '#fff', height: '100vh' }} >

          <div >
            <h2>Colabore com "O Cabueta."</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="box-container">
              <div className="popup">
                <Button onClick={handleClickOpen}>Clique Aqui Para Responder o Questionário</Button>
              </div>

              <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Ajude ao Software Cabueta a Combater a Corrupção.</DialogTitle>
                <DialogContent>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label"> O que fez com que você repondesse esse questionario?</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={q1}
                      onChange={event => setQ1(event.target.value)}
                      input={<Input />}
                    >
                      <MenuItem value="">
                        <em>Selecione uma opção!</em>
                      </MenuItem>
                      <MenuItem value={10}>Valor muito Acima do Mercado.</MenuItem>
                      <MenuItem value={20}>Produto de Baixa qualidade.</MenuItem>
                      <MenuItem value={30}>Valor muito Estranho.</MenuItem>
                      <MenuItem value={40}>Compra ou Aquisição Desnecessária.</MenuItem>
                      <MenuItem value={50}>Quantidade acima do Normal.</MenuItem>
                      <MenuItem value={60}>Quantidade abaixo do Normal.</MenuItem>
                      <MenuItem value={70}>Não entendi a Descrição do Código em Decimal.</MenuItem>
                      <MenuItem value={80}>Quero denunciar um falta de equipamento, que supostamente foi comprado e entregue ao seu destinatário, mas não chegou.</MenuItem>
                      <MenuItem value={90}>Funcionário Publico com salário exorbitante.</MenuItem>
                      <MenuItem value={100}>Falta de equipamento em orgãos com finalidades especificas e imprecindiveis (Hospitais, posto de saúde.</MenuItem>
                      <MenuItem value={110}>Acha que a empresa ganhadora te algum vinculo familiar com o gestor da cidade.</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label"> O seu posicionamento politico é em relação aos atuais gestores de seu Municipio?</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={q2}
                      onChange={event => setQ2(event.target.value)}
                      input={<Input />}
                    >
                      <MenuItem value="">
                        <em>Selecione uma opção!</em>
                      </MenuItem>
                      <MenuItem value={10}>Completamente a favor.</MenuItem>
                      <MenuItem value={20}>Completamente Contra.</MenuItem>
                      <MenuItem value={30}>Indiferente.</MenuItem>
                      <MenuItem value={40}>Não tenho posicionamento político.</MenuItem>
                      <MenuItem value={50}>Não vejo importancia nesta informação.</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label"> Em qual setor você acredita que deveria ter mais atenção do gestor atual de seu município?</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={q3}
                      onChange={event => setQ3(event.target.value)}
                      input={<Input />}
                    >
                      <MenuItem value="">
                        <em>Selecione uma opção!</em>
                      </MenuItem>
                      <MenuItem value={10}>SAÚDE.</MenuItem>
                      <MenuItem value={20}>EDUCAÇÃO.</MenuItem>
                      <MenuItem value={30}>SEGURANÇA.</MenuItem>
                      <MenuItem value={40}>LAZER.</MenuItem>
                      <MenuItem value={50}>TRANSPORTE PÚBLICO.</MenuItem>
                      <MenuItem value={50}>INFRAESTUTURA.</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-dialog-select-label"> Se voce tivesse que investir esse valor que esta no pregão onde fez com que você chegasse até aqui, em qual setor você investiria completamente,e porquê?</InputLabel>
                    <Select
                      labelId="demo-dialog-select-label"
                      id="demo-dialog-select"
                      value={q4}
                      onChange={event => setQ4(event.target.value)}
                      input={<Input />}
                    >
                      <MenuItem value="">
                        <em>Selecione uma opção!</em>
                      </MenuItem>
                      <MenuItem value={10}>SAÚDE.</MenuItem>
                      <MenuItem value={20}>EDUCAÇÃO.</MenuItem>
                      <MenuItem value={30}>SEGURANÇA.</MenuItem>
                      <MenuItem value={40}>LAZER.</MenuItem>
                      <MenuItem value={50}>TRANSPORTE PÚBLICO.</MenuItem>
                      <MenuItem value={50}>INFRAESTUTURA.</MenuItem>
                    </Select>
                  </FormControl>

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Enviar
                </Button>
                </DialogActions>
              </Dialog>

            </div>
            <div className="box-container">
              <Dropzone onDropAccepted={handleUpload}>
                {({ getRootProps, getInputProps }) => (
                  <div className="upload"  {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Arraste arquivos ou clique aqui</p>
                  </div>
                )}
              </Dropzone>

              {/* <input type="file" onChange={(e) => onChangeSetaFile(e)} /> */}
            </div>

            <div className="box-container">
              <textarea onChange={event => setObs(event.target.value)} placeholder="Qual é o maior problema de sua cidade? Comente e mande uma self com a data e a hoara!, ai vamos ver o que poderemos fazer juntos!" rows="7" cols="73"></textarea>
            </div>
            <div className="box-container">
              <FormControlLabel
                control={
                  <Checkbox checked={state.checkedA} onChange={handleChangeCheck('checkedA')} value="checkedA" />
                }
                label="Confirmo todos os dados."
                required
              />
            </div>
            <div className="box-button">
              <Button type="submit" disabled={!state.checkedA} variant="contained" color="secondary">
                Enviar
            </Button>
            </div>
          </form>
        </Typography>
      </Container>
    </>
  );
}