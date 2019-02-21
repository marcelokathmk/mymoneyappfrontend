import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { init } from './billingCycleActions'
import labelAndInput from '../common/form/labelAndInput'
import CreditList from './creditList'

class BillingCycleForm extends Component {

    render() {

        const { handleSubmit, readOnly, submitClass, submitLabel, credits }  = this.props

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} label='Nome' placeholder='Informe o nome' cols='12 4' readOnly={readOnly} />
                    <Field name='month' component={labelAndInput} label='Mês' type='number' placeholder='Informe o mês' cols='12 4' readOnly={readOnly} />
                    <Field name='year' component={labelAndInput} label='Ano' type='number' placeholder='Informe o ano' cols='12 4' readOnly={readOnly} />
                    <CreditList cols='12 6' readOnly={readOnly} list={credits} />
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
const mapStateToProps = state => ({credits: selector(state, 'credits')})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)