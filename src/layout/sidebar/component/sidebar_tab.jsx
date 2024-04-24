import PropTypes from 'prop-types';

function SidebarTab ({children, name, onClick, select = false}) {
    return(
        <div className={`w-full px-5 h-10 cursor-pointer items-center flex justify-start rounded-md gap-3
        ${select ? 'bg-blue-400 text-white' : 'hover:bg-slate-200/50'}`} 
        onClick={() => onClick(name)}>
            {children}
            <p className='font-semibold'>{name}</p>
        </div>
    )
}

SidebarTab.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    onClick: PropTypes.func,
    select: PropTypes.bool
}

export default SidebarTab
