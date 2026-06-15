import { useState } from 'react'
import { buttonStyle } from './styles'

class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
    constructor() {
      this.head = null
    }

    append(value) {
      const newNode = new ListNode(value)

      if (!this.head) {
        this.head = newNode
      }
      else {
        let current = this.head
        while (current.next !== null) {
          current = current.next
        }
        current.next = newNode
      }
    }

    prepend(value) {
      const newNode = new ListNode(value)
      newNode.next = this.head
      this.head = newNode
    }

    delete(value) {
      if (this.head.value === value) {
        this.head = this.head.next
        return
      }
      let current = this.head
      while (current.next !== null) {
        if (current.next.value === value) {
          current.next = current.next.next
          return
        }
        current = current.next
      }
    }

    toArray() {
      const result = []
      let current = this.head
        while (current !== null) {
          result.push(current.value)
          current = current.next
        }

      return result
    }
  }

function LinkedListVisualizer() {
    const [listArray, setListArray] = useState([10,20,30])
    const [inputValue, setInputValue] = useState('')

    function handleAppend() {
        const list = new LinkedList()
        listArray.forEach(value => list.append(value))
        list.append(Number(inputValue))
        setListArray(list.toArray())
        setInputValue('')
    }

    function handlePrepend() {
        const list = new LinkedList()
        listArray.forEach(value => list.prepend(value))
        list.prepend(Number(inputValue))
        setListArray(list.toArray())
        setInputValue('')
    }

    function handleDelete() {
        if (!listArray.includes(Number(inputValue))) {
        alert('Value not found in list')
        return
        }
        const list = new LinkedList()
        listArray.forEach(value => list.append(value))
        list.delete(Number(inputValue))
        setListArray(list.toArray())
        setInputValue('')
    }


    return(
        <div style={{ padding: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>Linked List</h2>
            <div>
            {listArray.map((value, index) => (
                <span key={index}>
                <div style={{
                    display: 'inline-block',
                    border: '2px solid steelblue',
                    padding: '8px',
                    borderRadius: '4px',
                    margin: '4px'
                }}>
                    {value}
                </div>
                {index < listArray.length - 1 ? '→' : '→ null'}
                </span>
            ))}

            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            </div>
            <div style={{ padding: '32px' }}> 
            <button style={buttonStyle} onClick={handleAppend}>Append</button>
            <button style={buttonStyle} onClick={handlePrepend}>Prepend</button>
            <button style={buttonStyle} onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default LinkedListVisualizer