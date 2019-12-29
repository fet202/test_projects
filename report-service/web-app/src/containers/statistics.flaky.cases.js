import './styles/statistics.flaky.cases.css'

import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import Modal from 'react-modal'
import {TestCase} from '../components/test.case'
import {Button} from '../components/button'
import {getFailReasons, mostFlakyCases} from '../utils/data.formaters'
import {colors} from '../utils/colors'
import {connect} from 'react-redux'


class StatisticsFlakyCases extends Component {
  state = {
    modalCases: []
  }

  getFailedReasonsPie = () => {
    const {
      config = {failedReasons: []},
      cases = []
    } = this.props

    const failedReasonsStructure = getFailReasons(config.failedReasons, cases)
    failedReasonsStructureScope = failedReasonsStructure
    const labels = Object.keys(failedReasonsStructure)

    return {
      labels,
      datasets: [{
        data: labels.map((item) => failedReasonsStructure[item].length),
        backgroundColor: labels.map((_ /**useless */, index) => colors[index])
      }]
    }
  }

  getFailedCases = () => {
    const {cases = [], testFlakyCount = 4} = this.props
    const casesData = mostFlakyCases(cases)
    Object.keys(casesData).forEach((caseId) => {
      if(casesData[caseId] < +testFlakyCount) {
        delete casesData[caseId]
      }
    })
    const labels = Object.keys(casesData)

    return {
      labels,
      datasets: [
        {
          label: 'Flaky cases',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: labels.map((item) => casesData[item])
        }
      ]
    }
  }

  handleClickBar = (data) => {
    const {cases} = this.props
    if(data.length) {
      const [{_model: {label}}] = data
      this.setState({modalCases: cases.filter(({id}) => id === label)})
    }
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const {modalCases} = this.state
    const dataBar = this.getFailedCases()

    return (
      <div className="statistics-flaky-cases">
        <Modal isOpen={!!modalCases.length} ariaHideApp={false}>
          <Button onClick={this.askToClose} title={'Close'} />
          {modalCases.map((testCase, index) => <TestCase key={index} {...testCase} />)}
        </Modal>
        <div>
          <Bar
            data={dataBar}
            getElementAtEvent={this.handleClickBar}
          />
        </div>
      </div>
    )
  }
}

export default connect(({cases}) => cases)(StatisticsFlakyCases)
