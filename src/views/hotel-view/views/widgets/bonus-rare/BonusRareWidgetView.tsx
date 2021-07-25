import { BonusRareInfoMessageEvent, GetBonusRareInfoMessageComposer } from 'nitro-renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { CreateMessageHook, SendMessageHook } from '../../../../../hooks/messages/message-event';
import { BonusRareWidgetViewProps } from './BonusRareWidgetView.types';

export const BonusRareWidgetView: FC<BonusRareWidgetViewProps> = props =>
{
  const [productType, setProductType] = useState<string>(null);
  const [productClassId, setProductClassId] = useState<number>(null);
  const [totalCoinsForBonus, setTotalCoinsForBonus] = useState<number>(null);
  const [coinsStillRequiredToBuy, setCoinsStillRequiredToBuy] = useState<number>(null);

  useEffect(() =>
  {
    SendMessageHook(new GetBonusRareInfoMessageComposer());
  }, []);

  const onBonusRareInfoMessageEvent = useCallback((event: BonusRareInfoMessageEvent) =>
  {
    const parser = event.getParser();
    setProductType(parser.productType);
    setProductClassId(parser.productClassId);
    setTotalCoinsForBonus(parser.totalCoinsForBonus);
    setCoinsStillRequiredToBuy(parser.coinsStillRequiredToBuy);
  }, []);

  CreateMessageHook(BonusRareInfoMessageEvent, onBonusRareInfoMessageEvent);

  if (!productType) return (null);

  return (
    <div className="bonus-rare widget d-flex">
      {productType}
      <div className="bg-light-dark rounded overflow-hidden position-relative bonus-bar-container">
        <div className="d-flex justify-content-center align-items-center w-100 h-100 position-absolute small top-0">{(totalCoinsForBonus - coinsStillRequiredToBuy) + '/' + totalCoinsForBonus}</div>
        <div className="small bg-info rounded position-absolute top-0 h-100" style={{ width: ((totalCoinsForBonus - coinsStillRequiredToBuy) / totalCoinsForBonus) * 100 + '%' }}></div>
      </div>
    </div>
  );
}
