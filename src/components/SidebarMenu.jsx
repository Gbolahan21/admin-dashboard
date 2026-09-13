import {useMemo, useCallback, useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import * as Helpers from '../helpers';

const SidebarMenu = ({
  onCreditClick,
  onRepaymentClick,
  onWithdrawalClick,
  type = 'sidebar', // 'sidebar' or 'mobile-nav'
  onOpenCardFlow,
  onCloseCardFlow,
  onCardSuccess,
}) => {
  const user = useSelector((state) => state.user);
  const cards = useSelector((state) => state.cards?.cards ?? []);
  const {cardFlowOpen, card, email, publicKey} = user;
  const hasCard = cards.length > 0;
  const hasPinEligibleCard = useMemo(
    () => cards.some((item) => Helpers.card.hasCardLast4(item)),
    [cards],
  );
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('credit');
  const sectionsRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia('(max-width: 1023px)').matches);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateScrollIndicators = useCallback(() => {
    const el = sectionsRef.current;
    if (!el) {
      return;
    }
    const {scrollTop, scrollHeight, clientHeight} = el;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 1);
  }, []);

  useEffect(() => {
    const el = sectionsRef.current;
    if (!el) {
      return;
    }

    // Initial calculation (immediately and on next frame in case layout/fonts/images shift)
    updateScrollIndicators();
    const rafId = requestAnimationFrame(updateScrollIndicators);
    const timeoutId = setTimeout(updateScrollIndicators, 300);

    // Observe scroll/resize
    el.addEventListener('scroll', updateScrollIndicators, {passive: true});
    window.addEventListener('resize', updateScrollIndicators);

    // Observe size/content changes
    const resizeObserver = new ResizeObserver(() => updateScrollIndicators());
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(() => updateScrollIndicators());
    mutationObserver.observe(el, {characterData: true, childList: true, subtree: true});

    window.addEventListener('load', updateScrollIndicators);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      el.removeEventListener('scroll', updateScrollIndicators);
      window.removeEventListener('resize', updateScrollIndicators);
      window.removeEventListener('load', updateScrollIndicators);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateScrollIndicators]);

  const scrollByAmount = useMemo(() => (isMobile ? 200 : 300), [isMobile]);

  const handleScrollDown = useCallback(() => {
    if (sectionsRef.current) {
      sectionsRef.current.scrollBy({behavior: 'smooth', top: scrollByAmount});
    }
  }, [scrollByAmount]);

  const handleScrollUp = useCallback(() => {
    if (sectionsRef.current) {
      sectionsRef.current.scrollBy({behavior: 'smooth', top: -scrollByAmount});
    }
  }, [scrollByAmount]);

  const handleCreditClick = useCallback(() => {
    setActiveTab('credit');
    if (onCreditClick) {
      onCreditClick();
    }
  }, [onCreditClick]);

  const handleRepaymentClick = useCallback(() => {
    setActiveTab('repayments');
    if (onRepaymentClick) {
      onRepaymentClick();
    }
  }, [onRepaymentClick]);

  const handleWithdrawalClick = useCallback(() => {
    setActiveTab('withdrawals');
    if (onWithdrawalClick) {
      onWithdrawalClick();
    }
  }, [onWithdrawalClick]);

  const sections = useMemo(
    () => [
      {
        items: [
          {
            active: activeTab === 'credit',
            icon: <img src={DashboardMenuIcon} width={16} height={17} />,
            label: 'Credit',
            onClick: handleCreditClick,
          },
          {
            active: activeTab === 'withdrawals',
            icon: <img src={WithdrawCreditIcon} width={16} height={17} />,
            label: 'Withdrawals',
            onClick: handleWithdrawalClick,
          },
          {
            active: activeTab === 'repayments',
            icon: <img src={UpdateCardIcon} width={16} height={17} />,
            label: 'Repayments',
            onClick: handleRepaymentClick,
          },
        ],
        title: 'MAIN MENU',
      },
      {
        items: [
          {
            icon: <img src={UpdateCardIcon} width={16} height={17} />,
            label: card ? 'Update Card' : 'Add Card',
            onClick: onOpenCardFlow,
          },
          {
            icon: <img src={WithdrawCreditIcon} width={16} height={17} />,
            label: 'Withdraw',
            to: '/withdrawal',
          },
          {
            icon: <img src={RepayCreditIcon} width={16} height={17} />,
            label: 'Repay',
            to: '/repay',
          },
          {
            icon: <img src={ApplyCreditIcon} width={16} height={17} />,
            label: 'Apply',
            to: '/offer',
          },
          ...(hasCard
            ? [
                {
                  disabled: !hasPinEligibleCard,
                  disabledMessage: "You will be able to set your card's pin once you have one.",
                  icon: <img src={UpdateCardIcon} width={16} height={17} />,
                  label: 'Card Pin',
                  to: hasPinEligibleCard ? '/pin' : undefined,
                },
              ]
            : []),
        ],
        title: 'QUICK ACTIONS',
      },
      {
        items: [
          {
            icon: <img src={HelpCentreIcon} width={16} height={17} />,
            label: 'Help Centre',
            to: '/faqs',
          },
          {
            icon: <img src={ContactSupportIcon} width={16} height={17} />,
            label: 'Contact Support',
            link: 'mailto:support@carrotcredit.com',
          },
          {
            icon: <img src={NotificationCentreIcon} width={16} height={17} />,
            label: 'Notification Centre',
            to: '/notifications',
          },
        ],
        title: 'SUPPORT',
      },
    ],
    [
      handleCreditClick,
      handleRepaymentClick,
      handleWithdrawalClick,
      onOpenCardFlow,
      activeTab,
      card,
      hasCard,
      hasPinEligibleCard,
    ],
  );

  // Mobile navigation tabs
  const mobileTabs = useMemo(
    () => [
      {
        icon: <img src={DashboardMenuIcon} width={16} height={17} />,
        id: 'credit',
        label: 'Credit',
        onClick: handleCreditClick,
      },
      {
        icon: <img src={WithdrawCreditIcon} width={16} height={17} />,
        id: 'withdrawals',
        label: 'Withdrawals',
        onClick: handleWithdrawalClick,
      },
      {
        icon: <img src={UpdateCardIcon} width={16} height={17} />,
        id: 'repayments',
        label: 'Repayments',
        onClick: handleRepaymentClick,
      },
    ],
    [handleCreditClick, handleRepaymentClick, handleWithdrawalClick],
  );

  // Mobile navigation render - show when screen is mobile OR type is mobile-nav
  if (isMobile || type === 'mobile-nav') {
    return (
      <div className="small-nav-tabs">
        {mobileTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={tab.onClick}
          >
            <div className="tab-icon">{tab.icon}</div>
            <div className="tab-label">{tab.label}</div>
          </button>
        ))}
        {cardFlowOpen && (
          <Paystack
            open={cardFlowOpen}
            action="add-card"
            userId={user?.user_id}
            email={email}
            publicKey={publicKey}
            onOpenCardFlow={onOpenCardFlow}
            onCloseCardFlow={onCloseCardFlow}
            onCardSuccess={onCardSuccess}
          />
        )}
      </div>
    );
  }

  // Desktop sidebar render
  return (
    <aside className="sidebar-container">
      <div className="logo-section">
        <Link to={Helpers.token.get('user:token') ? '/dashboard' : '/'}>
          <img src={DashboardIcon} alt="CarrotCredit" />
        </Link>
        <div className="logo-section-text">
          <h1>CarrotCredit</h1>
        </div>
      </div>
      <div className="sidebar-sections-wrapper">
        <div className="sidebar-sections" ref={sectionsRef}>
          {sections.map((section, idx) => (
            <div key={section.title || idx}>
              <div className="sidebar-section-title">{section.title}</div>
              <ul className="sidebar-menu-list">
                {section.items.map((item, i) => (
                  <li
                    key={item.label || i}
                    className={`sidebar-menu-item ${item.active ? 'active' : ''} ${
                      item.disabled ? 'sidebar-menu-item-disabled' : ''
                    }`}
                    onClick={item.disabled ? undefined : item.onClick}
                  >
                    {item.disabled ? (
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id={`sidebar-disabled-${item.label}`}>
                            {item.disabledMessage}
                          </Tooltip>
                        }
                      >
                        <span className={'sidebar-menu-item sidebar-menu-item-disabled'}>
                          <span className="icon">{item.icon}</span>
                          <span>{item.label}</span>
                        </span>
                      </OverlayTrigger>
                    ) : item.to ? (
                      <Link
                        to={item.to}
                        className={`sidebar-menu-item link ${item.active ? 'active' : ''}`}
                      >
                        <span className="icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ) : item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`sidebar-menu-item ${item.active ? 'active' : ''}`}
                      >
                        <span className="icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <>
                        <span className="icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {canScrollUp && (
          <button className="scroll-arrow top" onClick={handleScrollUp} aria-label="Scroll up">
            {/* Up arrow */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 8l-6 6h12l-6-6z" fill="#FE5000" />
            </svg>
          </button>
        )}
        {canScrollDown && (
          <button
            className="scroll-arrow bottom"
            onClick={handleScrollDown}
            aria-label="Scroll down"
          >
            {/* Down arrow */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 16l6-6H6l6 6z" fill="#FE5000" />
            </svg>
          </button>
        )}
      </div>
      {cardFlowOpen && (
        <Paystack
          open={cardFlowOpen}
          action="add-card"
          userId={user?.user_id}
          email={email}
          publicKey={publicKey}
          onOpenCardFlow={onOpenCardFlow}
          onCloseCardFlow={onCloseCardFlow}
          onCardSuccess={onCardSuccess}
        />
      )}
    </aside>
  );
};

export default SidebarMenu;
