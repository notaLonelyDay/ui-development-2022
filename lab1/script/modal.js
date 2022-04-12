function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Registration</span>
                    <span class="modal-close">&times;</span>
                </div>

                <div class="modal-body">
                    <input name="name" id="name" placeholder="Name:" class="name" required />
                    <input name="emailaddress" id="email" placeholder="Email:" class="email" required />
                    <input name="phonenumber" type="text" id="phone" placeholder="Phone number:" class="modalphone" required />
                </div>

                <div class="modal-footer">
                    <input name="submit" id="btn-send" class="btn-send" type="submit" value="Send"/>
                </div> 
            </div>    
        </div>
    `)
    document.body.appendChild(modal)
    return modal
}

function modal(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false

    return{
        open() {
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(()=>{
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        }
    }
}