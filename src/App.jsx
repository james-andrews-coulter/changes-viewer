import React, { useState, useRef } from 'react'
import './App.css'
import ChangesTable from './components/ChangesTable'

function App() {
  const [tableData, setTableData] = useState([])
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const text = reader.result
        const parsed = JSON.parse(text)
        const differences = Array.isArray(parsed.differences) ? parsed.differences : []
        const data = Array.isArray(parsed.data) ? parsed.data : []

        const addedLinks = new Set(
          differences
            .filter((d) => d.type === 'added')
            .flatMap((d) => d.fields)
            .filter((f) => f.key === 'link')
            .map((f) => f.value)
        )

        const dataMapped = data.map((rec) => ({
          ...rec,
          status: addedLinks.has(rec.link) ? 'added' : 'unchanged',
        }))

        const removedItems = differences
          .filter((d) => d.type === 'removed')
          .map((rec) => {
            const obj = {}
            ;(rec.fields || []).forEach((f) => {
              obj[f.key] = f.value
            })
            return { ...obj, status: 'removed' }
          })

        const combined = [...dataMapped, ...removedItems]
        setTableData(combined)
        console.log('Parsed tableData:', combined)
      } catch (err) {
        console.error('Failed to parse JSON:', err)
        alert('Failed to parse JSON file. Check console for details.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {tableData.length === 0 ? (
        <>
          <div className="flex items-center justify-center">
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow"
            >
              Upload File
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </>
      ) : (
        <ChangesTable data={tableData} />
      )}
    </div>
  )
}

export default App
