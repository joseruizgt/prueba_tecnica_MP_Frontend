/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export const VerticalStepperReceipt = ({ list }) => {

  const formatearFecha = (fecha) => {
    const d = new Date(fecha);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const anio = d.getFullYear();
    const horas = d.getHours().toString().padStart(2, '0');
    const minutos = d.getMinutes().toString().padStart(2, '0');
    const segundos = d.getSeconds().toString().padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}h:${minutos}min:${segundos}s`;
  }

  const armarSteps = () => {
    let listAux = [];
    let contador = 0;

    if (Object.keys(list).length > 0) {
      if (list.usuario_creo_recibo !== null) {
        listAux.push({
          label:
            <>
              <div className='flex'>
                <p className='font-bold'>{`${'Creado por:'}`}&nbsp;</p>
                <p>{` ${list.usuario_creo_recibo.nombre} ${list.usuario_creo_recibo.apellido} | ${list.usuario_creo_recibo.puesto.puesto} |  ${list.usuario_creo_recibo.agencia.agencia}`}</p>
              </div>
              <div className='flex'>
                <p className='font-bold'>{`${'Fecha:'}`}&nbsp;</p>
                <p>{` ${formatearFecha(list.fecha_creacion)}`}</p>
              </div>
            </>,
          flag: true
        });
      }
      if (list.usuario_aprobo_recibo !== null) {
        listAux.push({
          label:
            <>
              <div className='flex'>
                <p className='font-bold'>{`${'Aprobado por:'}`}&nbsp;</p>
                <p>{` ${list.usuario_aprobo_recibo.nombre} ${list.usuario_aprobo_recibo.apellido} | ${list.usuario_aprobo_recibo.puesto.puesto} |  ${list.usuario_aprobo_recibo.agencia.agencia}`}</p>
              </div>
              <div className='flex'>
                <p className='font-bold'>{`${'Fecha:'}`}&nbsp;</p>
                <p>{` ${formatearFecha(list.fecha_aprobacion)}`}</p>
              </div>
            </>,
          flag: true
        });
      } else {
        listAux.push({
          label: <p className='font-bold'>Pendiente de aprobación</p>,
          flag: false
        });
      }

      if (list.usuario_autorizo_recibo !== null) {
        listAux.push({
          label:
            <>
              <div className='flex'>
                <p className='font-bold'>{`${'Autorizado por:'}`}&nbsp;</p>
                <p>{` ${list.usuario_autorizo_recibo.nombre} ${list.usuario_autorizo_recibo.apellido} | ${list.usuario_autorizo_recibo.puesto.puesto} |  ${list.usuario_autorizo_recibo.agencia.agencia}`}</p>
              </div>
              <div className='flex'>
                <p className='font-bold'>{`${'Fecha:'}`}&nbsp;</p>
                <p>{` ${formatearFecha(list.fecha_autorizacion)}`}</p>
              </div>
            </>,
          flag: true
        });
      } else {
        listAux.push({
          label:
            <p className='font-bold'>Pendiente de autorización</p>,
          flag: false
        });
      }

      listAux.forEach(item => {
        if (item.flag) {
          contador += 1;
        }
      });

      return {
        lista: listAux,
        contador: contador
      };

    } else {
      return {
        lista: [],
        contador: contador
      };
    }
  }

  return (
    <Box>
      <Stepper activeStep={armarSteps().contador} orientation="vertical">
        {armarSteps().lista.map((step, index) => (
          <Step key={index} style={{ cursor: 'pointer' }}>
            <StepLabel>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}