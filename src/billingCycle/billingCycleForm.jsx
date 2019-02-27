import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { init } from './billingCycleActions'
import labelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    calculateSummary(){
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum, 0),
            sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum, 0)
        }
    }

    render() {

        const { handleSubmit, readOnly, submitClass, submitLabel, credits, debts }  = this.props
        const { sumOfCredits, sumOfDebts } = this.calculateSummary()

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} label='Nome' placeholder='Informe o nome' cols='12 4' readOnly={readOnly} />
                    <Field name='month' component={labelAndInput} label='Mês' type='number' placeholder='Informe o mês' cols='12 4' readOnly={readOnly} />
                    <Field name='year' component={labelAndInput} label='Ano' type='number' placeholder='Informe o ano' cols='12 4' readOnly={readOnly} />
                    
                    <Summary credit={sumOfCredits} debt={sumOfDebts} />
                    
                    <ItemList cols='12 6' readOnly={readOnly} list={credits} field='credits' legend='Créditos' showStatus={false} />
                    <ItemList cols='12 6' readOnly={readOnly} list={debts} field='debts' legend='Débitos' showStatus={true} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${submitClass}`}>{submitLabel}</button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>

            </form>
        )
    }
}

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
// Função do redux form, onde você obtem o atributo do formulario que deseja extrair, sempre colocar no mapStateToProps
const selector = formValueSelector('billingCycleForm')
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)