import React from 'react'

class PickerView extends React.Component {
    constructor(props) {
        super(props)
        this.pickerView = React.createRef()
        this.state = {
            value: [0]
        }
        this.onChange = evt => {
            console.log(evt.detail.value)
            this.setState({
                value: evt.detail.value
            })
        }
    }

    componentDidMount() {
        this.pickerView.current.addEventListener('change', this.onChange)
    }

    componentWillUnmount() {
        this.pickerView.current.removeEventListener('change', this.onChange)
    }

    render() {
        return (
            <wx-picker-view
                ref={this.pickerView}
                style={{ width: '100%', height: '300px' }}
                value={this.state.value}
            >
                <wx-picker-view>
                    <div>春</div>
                    <div>夏</div>
                    <div>秋</div>
                    <div>冬</div>
                </wx-picker-view>
            </wx-picker-view>
        )
    }
}

export default PickerView
