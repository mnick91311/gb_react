import React from 'react';
import './styles.css';

// Проверяем, поддерживаются ли push-уведомления
function isPushSupported(changePushStatus) {
    // Разрешил ли пользователь отправлять push-уведомления
    if (Notification.permission === 'denied') {
        alert('Вы заблокировали push-уведомления');
        return;
    }
    //Поддерживаются ли push-уведомления браузером пользователя
    if (!('PushManager' in window)) {
        alert('Извините, push-уведомления не поддерживаются вашим браузером.');
        return;
    }
    // Если service-worker зарегистрирован,
    // проверяем, подписан ли пользователь на push-уведомления
    navigator.serviceWorker.ready
        .then(function(registration) {
            registration.pushManager.getSubscription()
                .then(function(subscription) {
                    if (subscription) {
                        changePushStatus(true);
                    } else {
                        changePushStatus(false);
                    }
                })
                .catch(function(error) {
                    console.error('Возникла ошибка', error);
                });
        });
}
// Предлагаем пользователю подписаться на push-уведомления
function subscribePush(changePushStatus) {
    navigator.serviceWorker.ready.then(function(registration) {
        if (!registration.pushManager) {
            alert('push-уведомления не поддерживаются вашим браузером.');
            return false;
        }
        // Подписываемся
        registration.pushManager.subscribe({
                userVisibleOnly: true // Всегда показывать уведомления
            })
            .then(function(subscription) {
                alert('Успешно подписаны.');
                console.info('Подписаны на push-уведомления.');
                console.log(subscription);
                changePushStatus(true);
            })
            .catch(function(error) {
                changePushStatus(false);
                console.error('Ошибка подписки на push-уведомления: ', error);
            });
    })
}
// Отписка от push-уведомлений
function unsubscribePush(changePushStatus) {
    navigator.serviceWorker.ready
        .then(function(registration) {
            registration.pushManager.getSubscription()
                .then(function(subscription) {
                    // Если подписки нет, то выходим
                    if (!subscription) {
                        alert('Невозможно отписаться от push-уведомлений.');
                        return;
                    }
                    // Непосредственно отписка
                    subscription.unsubscribe()
                        .then(function() {
                            alert('Успешно отписаны.');
                            console.info('push-уведомлений отменены.');
                            console.log(subscription);
                            changePushStatus(false);
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                })
                .catch(function(error) {
                    console.error('Не получилось отписаться от push-уведомлений.');
                });
        })
}

export default class PushToggle extends React.Component {
    state = {
        status: false,
    }

    handleChangePushStatus = (val) => {
        this.setState({ status: val })
    }

    handleClick = () => {
        if (this.state.status) {
            unsubscribePush(this.handleChangePushStatus)
        } else {
            subscribePush(this.handleChangePushStatus)
        }
    }

    componentDidMount() {
        isPushSupported(this.handleChangePushStatus)
    }

    render() {
        const img_url = `/static/images/push-${this.state.status ? 'on' : 'off'}.png`
        return <div className="push" onClick={this.handleClick}>
                    <img className="push__image" 
                        src={img_url} 
                        alt="Push Notification"/>
                </div>
    }
}