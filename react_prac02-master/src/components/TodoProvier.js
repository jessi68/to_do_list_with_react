import React, {useReducer, createContext,useContext, useRef} from 'react';

const initialTodos=
	  [
		  {
			  id:1,
			  text:'일단 니가준거말고 내가 이것저것 검색해서 만들어봄',
			  done:'true'
		  },
		  {
			  id:2,
			  text:'기능구현까지는 꾸역꾸역 알거같음',
			  done:'true'
		  },
		  {
			  id:3,
			  text:'문제는 css임',
			  done:'false'
		  },
		  {
			  id:4,
			  text:'간단한 css는 문제가 안되는데 리액트에 css를 넣으려니까 어려움',
			  done:'false'
		  },
		  {
			  id:5,
			  text:'그래서 일단 모르는 css는 그대로 베낌(의사클래스 <- 이건 아직 모르겠음)',
			  done:'false'
		  }  		  
	  ];



function todoReducer(state,action)
{
	switch(action.type)
		{
			case 'CREATE':
				return state.concat(action.todo);
			
			case 'TOGGLE':
				return state.map(todo =>
					todo.id === action.id ? {...todo, done:!todo.done} : todo);
				
			case 'REMOVE':
				return state.filter(todo => todo.id !== action.id);
				
			default:
				throw new Error('Unhandled action type : $(action.type)');
		}	
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


export function TodoProvider({children})
{
	const[state, dispatch] = useReducer(todoReducer, initialTodos);
	const nextId=useRe(5);
	return(
		<TodoStateContext.Provider value={state}>
			<TodoDispatchContext.Provider value={dispatch}>
				<TodoNextIdContext.Provider value={nextId}>
					{children}
				</TodoNextIdContext.Provider>
			</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	);
}

export function useTodo(item) 
{
   const context = useContext(item)
   if(!context) {
		throw new Error('Cannot find TodoProvider');
   }
   return context;
}


export function useTodoState()
{
	const context= useContext(TodoStateContext);
	if(!context)
	{
		throw new Error('Cannot find TodoProvider');
	}
	return context;

// export function useTodoDispatch()
// {
// 	const context= useContext(TodoDispatchContext);
// 	if(!context)
// 	{
// 		throw new Error('Cannot find TodoProvider');
// 	}
// 	return context;
// }

// export function useTodoNextId()
// {
// 	const context= useContext(TodoNextIdContext);
// 	if(!context)
// 	{
// 		throw new Error('Cannot find TodoProvider');
// 	}
// 	return context;
// }
