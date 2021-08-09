import { FC, useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { LocalizeText } from '../../../../../utils/LocalizeText';
import { GetWiredTimeLocale } from '../../../common/GetWiredTimeLocale';
import { useWiredContext } from '../../../context/WiredContext';
import { WiredFurniType } from '../../../WiredView.types';
import { WiredTriggerBaseView } from '../base/WiredTriggerBaseView';

export const WiredTriggeExecutePeriodicallyView: FC<{}> = props =>
{
    const [ time, setTime ] = useState(1);
    const { trigger = null, setIntParams = null } = useWiredContext();

    useEffect(() =>
    {
        setTime((trigger.intData.length > 0) ? trigger.intData[0] : 0);
    }, [ trigger ]);

    const save = useCallback(() =>
    {
        setIntParams([ time ]);
    }, [ time,  setIntParams ]);

    return (
        <WiredTriggerBaseView requiresFurni={ WiredFurniType.STUFF_SELECTION_OPTION_NONE } save={ save }>
            <div className="form-group">
                <label className="fw-bold">{ LocalizeText('wiredfurni.params.settime', [ 'seconds' ], [ GetWiredTimeLocale(time) ]) }</label>
                <ReactSlider
                    className={ 'nitro-slider' }
                    min={ 1 }
                    max={ 60 }
                    value={ time }
                    onChange={ event => setTime(event) } />
            </div>
        </WiredTriggerBaseView>
    );
}
