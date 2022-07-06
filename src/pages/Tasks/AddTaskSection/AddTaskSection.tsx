import './AddTaskSection.scss';
import React, { useState } from 'react';
import CrossSvg from '../../../assets/img/icon-add.svg';
import { CSSTransition } from 'react-transition-group';
import TextareaAutosize from 'react-textarea-autosize';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../components/Input/Input';
import { Textarea } from '../../../components/Textarea/Textarea';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import IsImportantConfirm from '../IsImportantConfirm/IsImportantConfirm';
import AutoHeight from '../../../components/AutoHeight/AutoHeight';
import DeadlineConfirm from '../IsImportantConfirm/DeadlineConfirm';
import { AnimatePresence, motion } from 'framer-motion';

interface INewTaskInputs {
  taskName: string,
  taskDesc: string,
}

const AddTaskSection = () => {
  const [open, setOpen] = useState({ value: false, prevValue: false });
  const { register, handleSubmit, formState: { errors } } = useForm<INewTaskInputs>();
  const [ action1, setAction1 ] = useState({ confirm: false, checked: false });
  const [ action2, setAction2 ] = useState({ confirm: false, checked: false });
  const [ action3, setAction3 ] = useState({ confirm: false, checked: false });
  const onSubmit: SubmitHandler<INewTaskInputs> = (data) => {
    console.log(data)
  };

  if (action1.checked && !action1.confirm) {
    return (
      <IsImportantConfirm
        onConfirm={()=>{setAction1({confirm: true, checked: true})}}
        onCancel={()=>{setAction1({confirm: false, checked: false})}}
      />
    )
  }
  if (action2.checked && !action2.confirm) {
    return (
      <DeadlineConfirm
        onConfirm={()=>{setAction2({confirm: true, checked: true})}}
        onCancel={()=>{setAction2({confirm: false, checked: false})}}
      />
    )
  }

  return (
    <div className='AddTaskSection'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className='AddTaskSection__section AddTaskSection__section--top'>
          <Input
            className='AddTaskSection__input'
            placeholder='Введите новую задачу...'
            onFocus={()=> {
              setOpen({ value: true, prevValue: true });
            }}
            {...register('taskName')}
            autoComplete='off'
          />
          <button className='AddTaskSection__button AddTaskSection__button--submit' type='submit'>
            <img className='AddTaskSection__button-img' src={CrossSvg} alt='Добавить задачу'/>
          </button>
          <CSSTransition in={open.value} timeout={500} classNames={`AddTaskSection__TRANSITION-close-button`}>
            <button
              // className='AddTaskSection__button AddTaskSection__button--close'
              className={`AddTaskSection__button AddTaskSection__button--close${open.prevValue?' AddTaskSection__TRANSITION-close-button-enter-done':''}`}
              onClick={()=>setOpen({value: false, prevValue: false})}
              type='button'
            >
              <img className='AddTaskSection__button-img AddTaskSection__button-img--rotated' src={CrossSvg} alt='Добавить задачу'/>
            </button>
          </CSSTransition>
        </div>
        <CSSTransition in={open.value} timeout={500} classNames='AddTaskSection__TRANSITION-hidden-form'>
          <div className={`AddTaskSection__section AddTaskSection__section--bottom${open.prevValue?' AddTaskSection__TRANSITION-hidden-form-enter-done':''}`}>
            <Textarea
              className={'AddTaskSection__textarea'}
              placeholder={'Дополнительно о задаче (необязательно)'}
              {...register('taskDesc')}
            />
            <div className='AddTaskSection__taskActions'>
              <label className='AddTaskSection__taskAction'>
                <span>Это важная задача!</span>
                <Checkbox checked={action1.checked}
                          onChange={()=>{
                            setAction1({checked: true, confirm: false})
                            setOpen({value: true, prevValue: true})
                          }}
                />
              </label>
              <label className='AddTaskSection__taskAction'>
                <span>Хочу дедлайн!</span>
                <Checkbox checked={action2.checked}
                          onChange={()=>{
                            setAction2({checked: true, confirm: false})
                            setOpen({value: true, prevValue: true})
                          }}
                />
              </label>
              <label className='AddTaskSection__taskAction'>
                <span>Хочу уведомление!</span>
                <Checkbox checked={action3.checked}
                          onChange={()=>{
                            setAction3({checked: true, confirm: false})
                            setOpen({value: true, prevValue: true})
                          }}
                />
              </label>
            </div>
          </div>
        </CSSTransition>
      </form>
    </div>
  )
};

// const AddTaskSection = () => {
//   const [open, setOpen] = useState({ value: false, prevValue: false });
//
//   return (
//     <AnimatePresence>
//       <motion.div
//         className='AddTaskSection'
//         initial={{height: '50px'}}
//         exit={{height: '50px'}}
//         style={{overflow: 'hidden'}}
//         animate={{height: 'auto'}}
//         transition={{duration: 1}}
//       >
//         <div className='AddTaskSection__section AddTaskSection__section--top'>
//           <Input
//             className='AddTaskSection__input'
//             placeholder='Введите новую задачу...'
//             onClick={()=> {
//               setOpen({ value: !open.value, prevValue: true });
//             }}
//             autoComplete='off'
//           />
//           <button className='AddTaskSection__button AddTaskSection__button--submit' type='submit'>
//             <img className='AddTaskSection__button-img' src={CrossSvg} alt='Добавить задачу'/>
//           </button>
//         </div>
//         { open.value &&
//         <div style={{height: '100px'}}></div>
//         }
//       </motion.div>
//     </AnimatePresence>
//
//   )
// }

export default AddTaskSection;